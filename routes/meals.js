const express = require('express');
const router = express.Router();
const mealsCtrl = require('../controllers/meals');
const isLoggedIn = require('../config/auth');

// This router is mounted to a "starts with" path of '/'

// GET /meals/new
router.get('/meals/new', isLoggedIn, mealsCtrl.new);
// POST / meals
router.post('/meals', isLoggedIn, mealsCtrl.create);
router.post('/sessions/:id/meals', mealsCtrl.addToFood)

module.exports = router;