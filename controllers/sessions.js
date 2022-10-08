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
        {_id: {$nin: meal.food}},
        function(err, meals) {
          res.render('session/show', { title: 'Session Details', session, meals });
        }
      )
  });
}

function newSession(req, res) {
  res.render('sessions/new', { title: 'Add Session' });
}

function create(req, res) {
// Need to "fix" date formatting to prevent day off by 1
// This is due to the <input type="date"> returning the date
// string in this format:  "YYYY-MM-DD"
// https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
    const s = req.body.date;
    req.body.date = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
    for (let key in req.body) { 
        if (req.body[key] === '') delete req.body[key];
    }
    const session = new Session(req.body);
    session.save(function(err) {
        // error handling
        if (err) return res.redirect('/sessions/new');
        res.redirect(`/sessions/${session._id}`);
    });
}