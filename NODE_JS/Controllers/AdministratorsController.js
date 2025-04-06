const Members = require('../Moduls/MembersModule'); // מודל העובדים
const Administrators = require('../Moduls/AdministatorsModule'); // מודל המנהלים
//יצירת מנהל מערכת מצלמות אבטחה חדש
async function createAdministrator(req, res) {
    try {
        let newAdmin = new Administrators(req.body); // יצירת אובייקט חדש
        await newAdmin.save(); // שמירת האובייקט במסד הנתונים
        res.status(201).send("Administrator created successfully!");
    } catch (error) {
        console.error("Error creating administrator:", error);
        res.status(500).send("Failed to create administrator.");
    }
}
//עדכון פרטי מנהל מערכת מצלמות אבטחה קיים
async function updateAdministrator(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const updatedAdmin = await Administrators.findByIdAndUpdate(id, req.body, { new: true }); //עדכון המנהל במסד הנתונים
        if (!updatedAdmin) {
            return res.status(404).send("Administrator not found.");
        }
        res.status(200).send("Administrator updated successfully!");
    } catch (error) {
        console.error("Error updating administrator:", error);
        res.status(500).send("Failed to update administrator.");
    }
}
//קבלת מנהל לפי מזהה
async function getAdministratorById(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const admin = await Administrators.findById(id); // חיפוש המנהל במסד הנתונים
        if (!admin) {
            return res.status(404).send("Administrator not found.");
        }
        res.status(200).json(admin); // החזרת המנהל שנמצא
    } catch (error) {
        console.error("Error fetching administrator:", error);
        res.status(500).send("Failed to fetch administrator.");
    }
}
//קבלת כל העובדים של מנהל זה 
async function getAllMembersByAdministrator(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const members = await Members.find({ administartorID: id });
        if (!members) {
            return res.status(404).send("No members found for this administrator.");
        }
        res.status(200).json(members); // החזרת כל העובדים שנמצאו
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).send("Failed to fetch members.");
    }
}
// יצירת עובד חדש למנהל זה והוספתו למערך העובדים
async function createMemberByAdministrator(req, res) {
    try {       
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const newMember = new Members({ ...req.body, administartorID: id }); // יצירת אובייקט חדש של עובד עם מזהה המנהל
        await newMember.save(); // שמירת האובייקט במסד הנתונים
        res.status(201).send("Member created successfully!");
    } catch (error) {
        console.error("Error creating member:", error);
        res.status(500).send("Failed to create member.");
    }
}
//קבלת כל שמות העובדים של מנהל זה
async function getAllMembersNamesByAdministrator(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const members = await Members.find({ administartorID: id }).select('name')// חיפוש כל העובדים של המנהל במסד הנתונים
        if (!members) {
            return res.status(404).send("No members found for this administrator.");
        }
        res.status(200).json(members); // החזרת כל העובדים שנמצאו
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).send("Failed to fetch members.");
    }
}

module.exports = {createAdministrator, updateAdministrator, getAdministratorById,getAllMembersByAdministrator,createMemberByAdministrator,getAllMembersNamesByAdministrator};
