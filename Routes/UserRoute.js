const express = require('express')
const { createUser, getUser, deleteUser, updateUser, singleUser} = require('../Controllers/userController')
const router = express.Router()


// define the home page route

router.post('/', createUser)

router.get('/', getUser)

router.get('/:id', singleUser)

router.delete('/', deleteUser)

router.patch('/:id', updateUser)

module.exports = router