const express = require("express");
const router = express.Router();

const {
  createUser,
  getUser,
  allUser,
  deleteUser,
  updateUser,
  singleUser,
} = require("../Controllers/userController");
const { protect } = require("../middleware/authMiddleWare");

router.post("/", createUser);
router.get("/", getUser);
router.get("/all", allUser);
router.get("/:id", singleUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.exports = router;
