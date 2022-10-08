const express = require('express')
const router = express.Router()

const activitiesCtrl = require('../controllers/activities')
const isLoggedIn = require('../config/auth')


router.post('/sessions/:id/activities', isLoggedIn, activitiesCtrl.create)
router.delete('/activities/:id', isLoggedIn, activitiesCtrl.delete)

module.exports = router