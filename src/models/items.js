const mongoose = require("mongoose");
const validator = require("validator");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      trim: true,
      type: String,
      validate(value) {
        if (value.length > 23) {
          throw new Error("Name should be less than 22 words.");
        }
      },
    },
    description: {
      required: true,
      trim: true,
      type: String,
      validate(value) {
        if (value.length > 101) {
          throw new Error("Description should be less than 100 words.");
        }
      },
    },
    quantity: {
      required: true,
      trim: true,
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error("Quantity must be more that 0.");
        }
      },
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      validate(value) {
        if (value < 0) {
          throw new Error("Price must be more that 0.");
        }
      },
    },
    category: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    images: [
      {
        image: {
          type: Buffer,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ItemSchema.virtual("users", {
//   ref: "User",
//   localField: "_id",
//   foreignField: "cartproducts",
// });

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
