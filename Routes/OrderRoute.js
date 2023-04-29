const express = require("express");
const { makeOrder, orderStatus } = require("../Controllers/orderController");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();
router.post("/success", orderStatus);
router.get("/", makeOrder);
module.exports = router;
