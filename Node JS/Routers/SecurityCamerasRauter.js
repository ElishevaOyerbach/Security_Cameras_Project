
const express = require("express")
const router = express.Router()
const {createSecurityCameras,deleteSecurityCamera} = require("../Controllers/SecurityCamerasController")


router.post("/createSecurityCameras",createSecurityCameras)

router.delete("/deleteSecurityCamera/:id",deleteSecurityCamera)


module.exports = router   