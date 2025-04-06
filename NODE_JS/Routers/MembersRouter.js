const express = require("express")
const router = express.Router()

const { getAllSecurityCamerasByMember, getAllAnalysisSchemaByMember } = require("../Controllers/MembersController")

router.get("/getAllSecurityCameras/:id", getAllSecurityCamerasByMember) // קבלת כל מצלמות האבטחה של עובד זה
router.get("/getAllAnalysisSchema/:id", getAllAnalysisSchemaByMember) // קבלת כל הסכמות של עובד זה


module.exports = router