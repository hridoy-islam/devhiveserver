const express = require("express");
const router = express.Router()

const { createUser, getUser, deleteUser, updateUser, singleUser} = require('../Controllers/userController')

// define the home page route

router.post('/', createUser)
router.get('/', getUser)
router.get("/:id", singleUser);
router.delete('/:id', deleteUser)
router.patch("/:id", updateUser);

module.exports = router;
