const moment = require("moment");
const express = require("express");
const router = express.Router();
const Order = require("../models/orders");
const auth = require("../middleware/auth");

//route for adding feedback
router.post("/", (req, res) => {
  const order = new Feedback({
    u_id: req.body.u_id,
    food_id: req.body.food_id,
    quantity: req.body.quantity,
    price: req.body.price,
    date: moment(),
    status: "InTransit"
  });
  order
    .save()
    .then(result => {
      res.status(201).json({
        message: "Order Success"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

//route for getting all orders
router.get("/", function(req, res) {
  Order.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    //.populate("u_id")
    .exec()
    .then(function(order) {
      res.send(order);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting all orders of particular user
router.get("/", function(req, res) {
  Order.find({})
    .sort({ createdAt: -1 }) //sort in descending order
    .populate("u_id")
    .exec()
    .then(function(order) {
      res.send(order);
    })
    .catch(function(e) {
      res.send(e);
    });
});

module.exports = router;
