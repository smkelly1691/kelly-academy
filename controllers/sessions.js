var Session = require('../models/session');
const Meal = require('../models/meal')

module.exports = {
  index,
  show,
  new: newSession,
  create
};

function index(req, res) {
  Session.find({}, function(err, sessions) {
    res.render('sessions/index', { title: 'All Sessions', sessions });
  });
  
}

function show(req, res) {
  Session.findById(req.params.id)
    .populate('food').exec(function(err, session) {
      console.log(session)
      Meal.find(
        {_id: {$nin: session.food}},
        function(err, meals) {
          res.render('sessions/show', { title: 'Session Details', session, meals });
        }
      )
  });
}

function newSession(req, res) {
  res.render('sessions/new', { title: 'Add Session' });
}

function create(req, res) {
  const s = req.body.date;
  req.body.date = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  for (let key in req.body) { 
    if (req.body[key] === '') delete req.body[key];
  }
  const session = new Session(req.body);
  session.save(function(err) {
    if (err) {
      console.log(err)
      return res.redirect('/sessions/new');
    }
    res.redirect('/sessions');
  });
}