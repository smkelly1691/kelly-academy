const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema= new Schema ( {
    title: { 
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    userName: String,
  }, {
    timestamps: true
  });

  const sessionSchema = new Schema( {
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    location: {
        type: String, 
        enum: ['Main Campus', 'Other']
    }, 
    date: {
        type: Date, 
        required: true,
        default: Date.now
    }, 
    activities: [activitySchema],
    food: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
  });

  module.exports = mongoose.model('Session', sessionSchema);