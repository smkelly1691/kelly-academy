var express = require('express');
var router = express.Router();
const sessionsCtrl = require('../controllers/sessions');
const isLoggedIn = require('../config/auth')

// All routes "start with" /sessions (from server.js)

// GET /sessions (index functionality)
router.get('/', sessionsCtrl.index);
// GET /sessions/new (new functionality)
router.get('/new', isLoggedIn, sessionsCtrl.new);
// GET /sessions/:id (show functionality)
router.get('/:id', sessionsCtrl.show);
// POST /sessions (create functionality)
router.post('/', isLoggedIn, sessionsCtrl.create);

module.exports = router;
