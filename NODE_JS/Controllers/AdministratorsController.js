const Members = require('../Moduls/MembersModule'); // מודל העובדים
const Administators  = require('../Moduls/AdministatorsModule'); // מודל המנהלים
const securityCameras=require("../Moduls/SecurityCamerasModule")

const jwt = require("jsonwebtoken");

async function createAdministrator(req, res) {
    try {
        let newAdmin = new Administators(req.body); // יצירת אובייקט חדש
        await newAdmin.save(); // שמירת האובייקט במסד הנתונים

        // יצירת טוקן לאחר יצירת המנהל
        const token = jwt.sign(
            { id: newAdmin._id, role: "Administrator" },
            process.env.SECRET
        );
        // שליחת תשובה עם הטוקן
        res.status(201).send({
            message: "Administrator created successfully!",
            token: token,
            name: newAdmin.name,
        });
    } catch (error) {
        console.error("Error creating administrator:", error);
        res.status(500).send("Failed to create administrator.");
    }
}

//login מנהל מצלמות אבטחה קיים
async function loginAdministrator(req, res) {
    try {
        const { name,email ,password } = req.body; // קבלת פרטי ההתחברות מהבקשה
        const admin = await Administators.findOne({ email }); // חיפוש המנהל לפי אימייל

        if (!admin || !(await admin.comparePassword(password))) { // בדיקת סיסמה
            return res.status(401).send("Invalid email or password.");
        }

        // יצירת טוקן לאחר התחברות מוצלחת
        const token = jwt.sign(
            { id: admin._id, role: "Administrator" },
            process.env.SECRET
        );

        res.status(200).send({
            message: "Login successful!",
            token: token
        });
    } catch (error) {
        console.error("Error logging in administrator:", error);
        res.status(500).send("Failed to log in administrator.");
    }
}                                      

//עדכון מנהל מצלמות אבטחה קיים
async function updateAdministrator(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const updatedAdmin = await Administators.findByIdAndUpdate(id, req.body, { new: true }); //והחזרת האובייקט מעודכן  עדכון המנהל במסד הנתונים
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
        const { id } = req.params;// קבלת מזהה המנהל מהפרמטרים של הבקשה
        const admin = await Administators.findById(id); // חיפוש המנהל במסד הנתונים
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
        const members = await Members.find({ administartorID: id }); // חיפוש כל העובדים של המנהל במסד הנתונים
        if (!members) {
            return res.status(404).send("No members found for this administrator.");
        }
        res.status(200).json(members); // החזרת כל העובדים שנמצאו
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).send("Failed to fetch members.");
    }
}

//קבלת כל השמות של העובדים של מנהל זה
async function getAllMembersNamesByAdministrator(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        const members = await Members.find({ administartorID: id }).select('name'); // חיפוש כל העובדים של המנהל במסד הנתונים
        if (!members) {
            return res.status(404).send("No members found for this administrator.");
        }
        res.status(200).json(members); // החזרת כל העובדים שנמצאו
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).send("Failed to fetch members.");
    }
}

//יצירת עובד חדש למנהל זה
async function createMemberByAdministrator(req, res) {
    try {
            // verifyToken יוודא שהטוקן תקין לפני שנגיע לשלב הזה
            const decoded = jwt.verify(token, process.env.SECRET);  // מחלצים את המידע מהטוקן
    
            // בדיקה אם מדובר במנהל על פי תפקיד
            if (decoded.role !== "admin") {
                return res.status(403).send("Access denied. You must be an administrator.");
            }
    
            // עכשיו אנחנו יודעים שזה מנהל, נוכל להוסיף את העובד
            const { id } = req.params; // מזהה המנהל שנשלח בפרמטר
            const newMember = new Members({ ...req.body, administartorID: id }); // יצירת אובייקט עובד חדש
            await newMember.save(); // שמירת העובד במסד הנתונים
    
            res.status(201).send("Member created successfully!");
        } catch (error) {
            console.error("Error creating member:", error);
            res.status(500).send("Failed to create member.");
        }
}

//הוספת מצלמת אבטחה חדשה למנהל זה
async function createSecurityCamerasByAdministrator(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה המנהל מהפרמטרים של הבקשה
        // יצירת אובייקט חדש של מצלמת אבטחה עם מזהה המנהל
        const newSecurityCamera = new securityCameras({ ...req.body, administartorID: id });
        await newSecurityCamera.save(); // שמירת מצלמת האבטחה במסד הנתונים

        // עדכון מערך arrSecurityCameras של המנהל
        const updatedAdmin = await Administators.findByIdAndUpdate(
            id,
            { $push: { arrSecurityCameras: newSecurityCamera._id } }, // הוספת מזהה מצלמת האבטחה למערך
            { new: true } // החזרת המסמך המעודכן
        );

        if (!updatedAdmin) {
            return res.status(404).send("Administrator not found.");
        }

        res.status(201).send("Security camera created and added to administrator successfully!");
    } catch (error) {
        console.error("Error creating security camera:", error);
        res.status(500).send("Failed to create security camera.");
    }
}

// ייצוא הפונקציות שנוצרו
module.exports = { 
createAdministrator, updateAdministrator, getAdministratorById, getAllMembersByAdministrator, 
createMemberByAdministrator,getAllMembersNamesByAdministrator, createSecurityCamerasByAdministrator,
loginAdministrator};