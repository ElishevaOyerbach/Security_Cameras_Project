const mongoose = require("mongoose")
const AdministartorsModule = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    arrMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Members'}],
    arrSecurityCameras:[{type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'}],
    arrAnalysisSchema: [{
        date: { type: Date, default: Date.now },
        sortAnalysis: { type: String},
        numberSecurityCamera:{type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'},
        IDSecurityCamera:{type: Number},
    }]
})
module.exports = mongoose.model( "Administrators",AdministartorsModule )