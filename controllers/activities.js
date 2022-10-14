const Session = require('../models/session')

module.exports = {
    create,
    delete: deleteActivity
}

function create(req, res) {
    Session.findById(req.params.id, function(err, session) {
        req.body.user = req.user._id
        req.body.userName = req.user.name
        req.body.userAvatar = req.user.avatar
        session.activities.push(req.body)
        session.save(function(err) {
            res.redirect(`/sessions/${session._id}`)
        })
    })
}

function deleteActivity(req, res, next) {
    Session.findOne({'activities._id': req.params.id, 'activities.user': req.user._id}).then(function(session) {
      if (!session) return res.redirect('/sessions');
      session.activities.remove(req.params.id);
      session.save().then(function() {
        res.redirect(`/sessions/${session._id}`);
      }).catch(function(err) {
        return next(err);
      });
    });
  }