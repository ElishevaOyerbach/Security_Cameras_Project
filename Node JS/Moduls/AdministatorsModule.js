const e = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const AdministratorsSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "Administrator" },
    arrMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Members'}],
    arrSecurityCameras:[{type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'}],
    arrAnalysisSchema: [{
        date: { type: Date, default: Date.now },
        sortAnalysis: { type: String },
        numberSecurityCamera: {type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'},
        IdSecurityCamera :{type:Number}
    }],
        arrAskForAccess: [{
        memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Members' },
        status: { type: String, default: "Pending" }, // Pending, Approved, Rejected
        dateRequested: { type: Date, default: Date.now },
        text: { type: String, required: true },
        accessType: { type: String, required: true } 
    }]
}) 

AdministratorsSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Administrators", AdministratorsSchema)
