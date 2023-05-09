const express = require("express");
const {
  createService,
  getService,
  updateService,
  deleteService,
  getSingleService,
  queryService,
} = require("../Controllers/serviceController");

const router = express.Router();

// define the home page route

router.post("/", createService);

router.get("/", getService);

router.get("/:query", queryService);

router.get("/:id", getSingleService);

router.delete("/:id", deleteService);

router.patch("/:id", updateService);

module.exports = router;
