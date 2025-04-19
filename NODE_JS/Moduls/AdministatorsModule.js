const e = require("express")
const mongoose = require("mongoose")
const AdministartorsModule = mongoose.Schema({
    name: { type:String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "Administrator" },
    arrMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Members'}],
    arrSecurityCameras:[{type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'}],
    arrAnalysisSchema: [{
        date: { type: Date, default: Date.now },
        sortAnalysis: { type: String, required: true },
        numberSecurityCamera: {type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'},
        IdSecurityCamera :{type:Number, required: true}
    }]
})
module.exports = mongoose.model( "Administrators",AdministartorsModule )