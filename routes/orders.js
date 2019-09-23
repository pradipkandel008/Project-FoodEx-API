const moment = require("moment");
const express = require("express");
const router = express.Router();
const Order = require("../models/orders");
const auth = require("../middleware/auth");

//route for adding order
router.post("/", (req, res) => {
  const order = new Order({
    phone: req.body.phone,
    food_name: req.body.food_name,
    quantity: req.body.quantity,
    price: req.body.price,
    food_imagename: req.body.food_imagename,
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

//route for adding order
router.post("/2", (req, res) => {
  var array = mongoose.Types.Array;
  const order = new Order({
    phone: req.body.phone,
    food_name: req.body.food_name,
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
