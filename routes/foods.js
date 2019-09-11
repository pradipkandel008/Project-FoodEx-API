const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function(req, res, cb) {
    cb(null, "./images");
  },
  filename: function(req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, "food" + Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    //accept
    cb(null, true);
  } else {
    //reject a file
    cb(new Error("File format not supported"), false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 //10MB
  },
  fileFilter: fileFilter
});

const Food = require("../models/foods");

//route for adding courses
router.post("/addFood", upload.single("food_image"), (req, res) => {
  const food = new Food({
    food_name: req.body.food_name,
    food_category: req.body.food_category,
    food_type: req.body.food_type,
    food_price: req.body.food_price,
    food_description: req.body.food_description,
    food_imagename: req.file.path,
    food_rating: "",
    food_offer: req.body.food_offer
  });
  food
    .save()
    .then(result => {
      res.status(201).json({
        message: "Food Added Successfully"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: err
      });
    });
});

//route for getting all courses
router.get("/", function(req, res) {
  Food.find()
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(food) {
      res.send(food);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting new foods
router.get("/newfood", function(req, res) {
  Food.find()
    .sort({ createdAt: -1 }) //sort in descending order
    .limit(4)
    .exec()
    .then(function(food) {
      res.send(food);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting foods with offer
router.get("/offerfood", function(req, res) {
  var text = "Yes";
  Food.find({ food_offer: text })
    .sort({ createdAt: -1 }) //sort in descending order
    .exec()
    .then(function(food) {
      res.send(food);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for getting course by id
router.get("/:id", function(req, res) {
  Course.findById(req.params.id)

    .then(function(course) {
      res.send(course);
    })
    .catch(function(e) {
      res.send(e);
    });
});

//route for updating course
router.put("/updateCourse/:id", auth, upload.single("course_image"), function(
  req,
  res
) {
  id = req.params.id.toString();
  if (req.file.path != null) {
    Course.findById(id).then(course => {
      let path = course.course_image;
      fs.unlink(path, err => {
        if (err) console.log(err);
      });
    });
  }

  Course.update(
    { _id: id },
    {
      $set: {
        course_name: req.body.course_name,
        course_duration: req.body.course_duration,
        course_price: req.body.course_price,
        course_modules: req.body.course_modules,
        course_desc: req.body.course_desc,
        course_image: req.file.path
      }
    }
  )
    .then(function(course) {
      res.status(201).json({
        message: "Course Updated Successfully"
      });
    })
    .catch(function(e) {
      res.send(e);
      console.log(e);
    });
});

//route for deleting course
router.delete("/deleteFood/:id", auth, (req, res) => {
  Food.findById(req.params.id).then(food => {
    let path = food.food_imagename;
    fs.unlink(path, err => {
      if (err) console.log(err);
    });
    food
      .delete()
      .then(function(result) {
        res.status(201).json({
          message: "Food Deleted Successfully"
        });
      })
      .catch(function(e) {
        console.log(e);
      });
  });
});

module.exports = router;
