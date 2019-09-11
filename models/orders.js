const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
      //required: true
    },
    food_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food"
      //required: true
    },
    quantity: {
      type: String
    },
    price: {
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
