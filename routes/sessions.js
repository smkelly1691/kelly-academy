var express = require('express');
var router = express.Router();
const sessionsCtrl = require('../controllers/sessions');
const isLoggedIn = require('../config/auth')

// All routes "start with" /sessions (from server.js)

router.get('/', sessionsCtrl.index);
router.get('/new', isLoggedIn, sessionsCtrl.new);
router.get('/:id', sessionsCtrl.show);
router.post('/', isLoggedIn, sessionsCtrl.create);

module.exports = router;
