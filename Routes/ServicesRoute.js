const express = require('express')
const { createService, getService, updateService, deleteService, getSingleService} = require('../Controllers/serviceController')
const router = express.Router()


// define the home page route

router.post('/', createService)

router.get('/', getService)

router.get('/:id', getSingleService)

router.delete('/:id', deleteService)

router.patch('/:id', updateService)

module.exports = router