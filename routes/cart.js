const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");
const auth = require("../middleware/auth");

//route for adding to cart
router.post("/", (req, res) => {
  //Cart.find({ phone: req.body.phone, food_name: req.body.food_name });
  const cart = new Cart({
    phone: req.body.phone,
    food_name: req.body.food_name,
    food_price: req.body.food_price,
    food_quantity:req.body.food_quantity,
    food_image_name:req.body.food_image_name

  });
  cart
    .save()
    .then(result => {
      res.status(201).json({
        message: "Food added to cart successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

//route for getting all cart
router.get("/", function(req, res) {
  Cart.find({ phone: req.body.phone })
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(cart) {
      res.send(cart);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for deleting item from cart
router.delete("/removefromcart/:id", (req, res) => {
  Cart.findByIdAndDelete(req.params.id)
    .then(function() {
      res.json("Removed!");
    })
    .catch(function(e) {
      res.send(e);
    });
});

module.exports = router;
