const express = require("express");
const router = express.Router();

const {
  createAdmin,
  // getAdmin,
  // allAdmin,
  // deleteAdmin,
  // updateAdmin,
  // singleAdmin,
} = require("../Controllers/adminController");
const { protect } = require("../middleware/authMiddleWare");
const { adminProtect } = require("../middleware/adminMiddleWare");

router.post("/", adminProtect, createAdmin);
// router.get("/", getUser);
// router.get("/all", adminProtect, allUser);
// router.get("/:id", singleUser);
// router.delete("/:id", protect, deleteUser);
// router.patch("/:id", protect, updateUser);

module.exports = router;
