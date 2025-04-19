
const express = require("express")
const verifyToken = require("../Middleware/auth").verifyToken;

const router = express.Router()
const {createAdministrator,updateAdministrator,getAdministratorById,
    getAllMembersByAdministrator,createMemberByAdministrator,getAllMembersNamesByAdministrator,
    createSecurityCamerasByAdministrator,loginAdministrator} = require("../Controllers/AdministratorsController")

router.post("/createAdministrator",createAdministrator)
router.post("/updateAdministrator/:id",updateAdministrator)
router.post("/createMemberByAdministrator/:id",verifyToken, createMemberByAdministrator)
router.post("/createSecurityCamerasByAdministrator/:id", createSecurityCamerasByAdministrator);

router.get("/loginAdministrator",loginAdministrator)

router.get("/getAdministratorById/:id",getAdministratorById)
router.get("/getAllMembersByAdministrator/:id",getAllMembersByAdministrator)
router.get("/getAllMembersNamesByAdministrator/:id",getAllMembersNamesByAdministrator)

module.exports = router