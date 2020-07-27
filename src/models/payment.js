const mongoose = require("mongoose");
const validator = require("validator");

const PaymentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
