const mongoose = require("mongoose")

const SecurityCamerasModule = mongoose.Schema({
    IdSecurityCamera: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    lenght: [{ type: Number}],
})

module.exports = mongoose.model( "SecurityCameras",SecurityCamerasModule )