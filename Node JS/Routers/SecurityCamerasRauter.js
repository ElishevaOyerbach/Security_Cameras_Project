const express = require("express")
const router = express.Router()
const {createSecurityCameras,addPeopleAnalysis,getPeopleAnalysis,deleteSecurityCamera} = require("../Controllers/SecurityCamerasController")


router.post("/createSecurityCameras",createSecurityCameras)
router.post("/addPeopleAnalysis/:id", addPeopleAnalysis);

router.delete("/deleteSecurityCamera/:id",deleteSecurityCamera)
router.get('/getPeopleAnalysis/:id',getPeopleAnalysis)

router.delete("/deleteSecurityCamera/:id",deleteSecurityCamera);

module.exports = router