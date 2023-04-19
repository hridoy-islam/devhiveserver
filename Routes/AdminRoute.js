const express = require("express");
const router = express.Router();

const {
  createAdmin,
  // getAdmin,
  allAdmin,
  deleteAdmin,
  updateAdminPass,
  // singleAdmin,
} = require("../Controllers/adminController");
const { protect } = require("../middleware/authMiddleWare");
const { adminProtect } = require("../middleware/adminMiddleWare");

router.post("/", adminProtect, createAdmin);
// router.get("/", getUser);
router.get("/all", adminProtect, allAdmin);
// router.get("/:id", singleUser);
router.delete("/:id", protect, adminProtect, deleteAdmin);
router.patch("/change-pass/:id", adminProtect, updateAdminPass);

module.exports = router;
