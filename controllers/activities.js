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
    // Note the cool "dot" syntax to query on the property of a subdoc
    Session.findOne({'activities._id': req.params.id, 'activities.user': req.user._id}).then(function(session) {
      // Rogue user!
      if (!session) return res.redirect('/sessions');
      // Remove the activity using the remove method available on Mongoose arrays
      session.activities.remove(req.params.id);
      // Save the updated session
      session.save().then(function() {
        // Redirect back to the session's show view
        res.redirect(`/sessions/${session._id}`);
      }).catch(function(err) {
        // Let Express display an error
        return next(err);
        // res.redirect(`/sessions/${session._id}`);
      });
    });
  }