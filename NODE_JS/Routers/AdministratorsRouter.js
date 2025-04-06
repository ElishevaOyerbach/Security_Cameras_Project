
const express = require("express")
const router = express.Router()
const {createAdministrator,updateAdministrator,getAdministratorById,getAllMembersByAdministrator,createMemberByAdministrator,getAllMembersNamesByAdministrator} = require("../Controllers/AdministratorsController")

router.post("/createAdministrator",createAdministrator)
router.post("/updateAdministrator/:id",updateAdministrator)
router.post("/createMemberByAdministrator/:id",createMemberByAdministrator)
router.get("/getAdministratorById/:id",getAdministratorById)
router.get("/getAllMembersByAdministrator/:id",getAllMembersByAdministrator)
router.get("/getAllMembersNamesByAdministrator/:id",getAllMembersNamesByAdministrator)


module.exports = router