const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema( {
    category: {
        type: String, 
        required: true, 
        enum: ['AM Snack', 'Breakfast', 'Lunch', 'PM Snack', 'Dinner']
    }, 
    description: {
        type: String, 
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
  });


module.exports = mongoose.model('Meal', mealSchema);