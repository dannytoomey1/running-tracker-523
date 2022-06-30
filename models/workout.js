const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const completedRepsSchema = new Schema ({
    times: [],
    repDistance: Number
},  {
    timestamps: true
});

const workoutSchema = new Schema({
    numReps: Number,
    goalPace: Number,
    repDistance: Number,
    break: Number,
    repTimes: completedRepsSchema,
    info: String,
    day: {
        type: Date,
        default: Date.now()
    },

    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

module.exports = mongoose.model("Workout", workoutSchema);