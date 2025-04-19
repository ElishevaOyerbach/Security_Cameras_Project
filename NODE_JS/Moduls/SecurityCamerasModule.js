const mongoose = require("mongoose")
const SecurityCamerasModule = mongoose.Schema({

    IDsecurityCamera: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    length: { type: Number }

})

module.exports = mongoose.model( "SecurityCameras",SecurityCamerasModule )
