const Meal = require('../models/meal');
const Session = require('../models/session');

module.exports = {
  new: newMeal,
  create,
  addToFood
};

function create(req, res) {
  Meal.create(req.body, function (err, meal) {
    res.redirect('/meals/new');
    console.log(err)
  });
}

function newMeal(req, res) {
  Meal.find({})
  //Sort meal entries by their category
  .sort('category')
  .exec(function (err, meals) {
    res.render('meals/new', {
      title: 'Add Meal',
      meals
    });
  });
}

function addToFood(req, res) {
  Session.findById(req.params.id, function(err, session) {
    session.food.push(req.body.mealId)
    session.save(function(err) {
      res.redirect(`/sessions/${session._id}`)
    })
  })
}