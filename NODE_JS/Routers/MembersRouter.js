
const express = require("express")
const router = express.Router()
const {getAllSecurityCamerasByMember,getAllAnalysisSchemaByMember} = require("../Controllers/MembersController")


router.get("/getAllSecurityCamerasByMember/:id",getAllSecurityCamerasByMember)
router.get("/getAllAnalysisSchemaByMember/:id",getAllAnalysisSchemaByMember)


module.exports = router   