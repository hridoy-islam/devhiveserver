const express = require("express");
const {
    createDeveloper,
    getDeveloper
} = require("../Controllers/developerController");

const router = express.Router();

// define the home page route

router.post("/", createDeveloper);
router.get("/developer", getDeveloper);

module.exports = router;
