const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Item = require("./items");

const UserSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      trim: true,
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (value.length < 7) {
          throw new Error("password can't less than 6 letter");
        }
      },
    },
    cartProducts: [
      {
        product: [
          {
            id: {
              type: String,
              required: true,
            },
            quantity: {
              type: Number,
              default: 1,
              validate(value) {
                if (value < 1) {
                  throw new Error("Inavlid input");
                }
              },
            },
          },
        ],
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("items", {
  ref: "Item",
  localField: "_id",
  foreignField: "owner",
});

UserSchema.statics.findbyCreds = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login.");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login.");
  }
  return user;
};

UserSchema.methods.createToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
