const mongoose = require("mongoose")
const MembersModule = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    administartor:{ type:String, required: true },
    administartorID:{ type:mongoose.Schema.Types.ObjectId, ref:'Administrators', required: true },
    arrSecurityCameras:[{type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'}],
    arrAnalysisSchema: [{
        date: { type: Date, default: Date.now },
        sortAnalysis: { type: String, required: true },
        nunberSecurityCamera:{type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'},
        IDSecurityCamera:{type: Number, required: true},
    }],
    AccessPermissions:[{
        sortPermissions:{type:String, required:true},
        isPermissions:{type:Boolean, required:true},
    }]
})

module.exports = mongoose.model( "Members",MembersModule )