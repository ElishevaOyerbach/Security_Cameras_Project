
const mongoose = require("mongoose")
const Membersmodule = mongoose.Schema({
    name: { type: String, required: true },
    password:{ type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: "Member" },
    administrator:{type:String, required:true},
    administartorID:{ type:mongoose.Schema.Types.ObjectId, ref:'Administrators', required: true },
    AccessPermissions:[{
     sortPermissions:{type:String, required:true},
     isPermissions:{type:Boolean, required:true}
    }],
    arrSecurityCameras:[{type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'}],
    arrAnalysisSchema: [{
        date: { type: Date, default: Date.now },
        sortAnalysis: { type: String },
        nunberSecurityCamera:{type:mongoose.Schema.Types.ObjectId, ref:'SecurityCameras'},
        IdSecurityCamera:{type: Number},
    }]
})

module.exports = mongoose.model( "Members",Membersmodule )
