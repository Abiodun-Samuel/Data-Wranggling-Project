const express = require("express");
const {
  homePage,
  postData,
  successPage,
} = require("../controllers/homeControllers.js");
const { check } = require("express-validator");

const router = express.Router();

router.get("/", homePage);
router.get("/success", successPage);
router.post(
  "/post",
  [
    check("url")
      .trim()
      .isLength({ min: 5 })
      .contains("http")
      .withMessage("Please enter a valid URL"),
  ],
  postData
);

module.exports = router;
