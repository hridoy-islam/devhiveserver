const express = require('express')
const { createService, getService, updateService, deleteService, getSingleService} = require('../Controllers/serviceController')
const { protect } = require('../middleware/authMiddleWare')
const router = express.Router()


// define the home page route

router.post('/', createService)

router.get('/', getService)

router.get('/:id', getSingleService)

router.delete('/:id', protect, deleteService)

router.patch('/:id', protect, updateService)

module.exports = router