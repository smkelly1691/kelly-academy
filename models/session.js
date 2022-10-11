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
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true },
    userName: String,
  }, {
    timestamps: true
  });

  const sessionSchema = new Schema( {
    date: {
        type: Date, 
        required: true,
        default: Date.now
    }, 
    location: {
        type: String, 
        enum: ['Main Campus', 'Other']
    }, 
    activities: [activitySchema],
    food: [{type: Schema.Types.ObjectId, ref: 'Meal'}],
  });

  module.exports = mongoose.model('Session', sessionSchema);