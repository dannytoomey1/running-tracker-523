const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const runSchema = new Schema({
    distance: Number,
    time: Number,
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

module.exports = mongoose.model("Run", runSchema);