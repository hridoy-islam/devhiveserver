const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  singleCategory,
  deleteCategory,
  updateCategory,
} = require("../Controllers/categoryController");

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", singleCategory);
router.delete("/:id", deleteCategory);
router.patch("/:id", updateCategory);

module.exports = router;
