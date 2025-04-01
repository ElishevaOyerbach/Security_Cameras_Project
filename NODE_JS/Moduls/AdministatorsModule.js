const mongoose = require("mongoose")
const AdministartorsModule = mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    arrMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Members'}],
    
})

module.exports = mongoose.model( "Administrators",AdministartorsModule )