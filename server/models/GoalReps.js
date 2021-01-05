var { Schema, model, Types } = require('mongoose');
const dayjs = require('dayjs');
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs.extend(weekOfYear)
const goalRepsSchema = new Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    pushups: {
        type: Number,
        default: 0
    },
    situps: {
        type: Number,
        default: 0
    },
    squats: {
        type: Number,
        default: 0
    },
    miles: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
  
  
  
  
    

}, {
    toJSON: {
        virtuals: true
    }
});



const GoalReps = model("GoalReps", goalRepsSchema);

module.exports = GoalReps;