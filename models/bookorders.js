const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    phone: {
      type: String
    },
    book_name: {
      type: String
    },
    book_price: {
      type: String
    },
    book_imagename: {
      type: String
    },
    payment_type: {
      type: String
    },
    date: {
      type: Date
    },
    status: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
