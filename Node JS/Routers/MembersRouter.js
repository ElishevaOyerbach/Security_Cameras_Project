
const express = require("express")
const router = express.Router()
const {getAllSecurityCamerasByMember,getAllAnalysisSchemaByMember,getAdministratorIdByMember} = require("../Controllers/MembersController")


router.get("/getAllSecurityCamerasByMember/:id",getAllSecurityCamerasByMember)
router.get("/getAllAnalysisSchemaByMember/:id",getAllAnalysisSchemaByMember)
router.get("/getAdministratorIdByMember/:id",getAdministratorIdByMember)


module.exports = router   