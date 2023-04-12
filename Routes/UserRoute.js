const express = require("express");
<<<<<<< HEAD
const router = express.Router()

const { createUser, getUser, deleteUser, updateUser, singleUser} = require('../Controllers/userController')

// define the home page route

router.post('/', createUser)
router.get('/', getUser)
router.get("/:id", singleUser);
router.delete('/:id', deleteUser)
=======
const {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  singleUser,
} = require("../Controllers/userController");
const router = express.Router();

// define the home page route
//

router.route("/").post(createUser).get(getUser);

router.get("/:id", singleUser);

// router.post('/', createUser)

router.delete("/", deleteUser);

>>>>>>> 7ae1625caccd47daff36e7ec054fac7922830806
router.patch("/:id", updateUser);

module.exports = router;
