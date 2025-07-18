
const mongoose = require("mongoose");

const SecurityCamerasModule = mongoose.Schema({
    IDsecurityCamera: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    length: { type: Number },
    filePath: { type: String },
    administartorID: { type: String },
    peoplePerMinute: [
        {
            hour: String,
            people: Number,
        },
    ],

});

module.exports = mongoose.model("SecurityCameras", SecurityCamerasModule);
