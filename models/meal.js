const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema( {
    name: {
        type: String, 
    },
    category: {
        type: String, 
        required: true, 
        enum: ['AM Snack', 'Breakfast', 'Lunch', 'PM Snack', 'Dinner']
    }, 
    description: {
        type: String, 
        required: true
    }, 
  });


module.exports = mongoose.model('Meal', mealSchema);