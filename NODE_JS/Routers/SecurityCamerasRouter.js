
const express = require("express")
const router = express.Router()
const {createSecurityCameras} = require("../Controllers/SecurityCamerasController")


router.post("/createSecurityCameras",createSecurityCameras)



module.exports = router   