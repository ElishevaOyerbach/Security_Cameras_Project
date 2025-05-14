
const express = require("express")
const verifyToken = require("../Middleware/auth").verifyToken;
const upload = require("../Middleware/upload"); // הוספה של המידלוור

const router = express.Router()

const {createAdministrator,updateAdministrator,getAdministratorById,getMemberCountByAdministrator,getCameraCountByAdministrator,
    getAllMembersByAdministrator,getRecentCameraCountByAdministrator,createMemberByAdministrator,getAllMembersNamesByAdministrator,
    createSecurityCamerasByAdministrator,loginAdministrator,deleteMemberByAdministrator,getAllSecurityCamerasByAdministrator,updateMemberByAdministrator} = require("../Controllers/AdministratorsController")


router.post("/createAdministrator",createAdministrator)
router.post("/updateAdministrator/:id",updateAdministrator)
router.post("/createMemberByAdministrator/:id", createMemberByAdministrator)
router.post("/createSecurityCamerasByAdministrator/:id", upload.single('video'), createSecurityCamerasByAdministrator);
router.post("/loginAdministrator",loginAdministrator)

router.put("/updateMemberByAdministrator/:id",verifyToken,updateMemberByAdministrator)

router.get("/getAdministratorById/:id",getAdministratorById)
router.get("/getMemberCountByAdministrator/:id",getMemberCountByAdministrator)
router.get("/getAllMembersByAdministrator/:id",verifyToken,getAllMembersByAdministrator)
router.get("/getRecentCameraCountByAdministrator/:id",getRecentCameraCountByAdministrator)
router.get("/getCameraCountByAdministrator/:id",verifyToken,getCameraCountByAdministrator)
router.get("/getAllMembersNamesByAdministrator/:id",verifyToken,getAllMembersNamesByAdministrator)
router.get("/getAllSecurityCamerasByAdministrator/:id",getAllSecurityCamerasByAdministrator)

router.delete("/deleteMemberByAdministrator/:id",verifyToken,deleteMemberByAdministrator)


module.exports = router