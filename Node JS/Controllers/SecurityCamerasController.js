const securityCameras=require("../Moduls/SecurityCamerasModule")
const mongoose = require('mongoose');


// פונקציה להוספת מצלמת אבטחה
async function createSecurityCameras(req, res) {
    try {
        const { IDsecurityCamera, date, length } = req.body; // קבלת נתוני מצלמת האבטחה מהבקשה
        const newSecurityCamera = new securityCameras({ IDsecurityCamera, date, length }); // יצירת מצלמת אבטחה חדשה
        await newSecurityCamera.save(); // שמירת מצלמת האבטחה במסד הנתונים
        res.status(201).json(newSecurityCamera); // החזרת מצלמת האבטחה שנוצרה
    } catch (error) {
        console.error("Error creating security camera:", error);
        res.status(500).send("Failed to create security camera.");
    }
}
async function deleteSecurityCamera(req, res) {
    try {
        const { id } = req.params;

        // בדיקה אם ObjectId חוקי
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid ID format.");
        }

        const deletedCamera = await securityCameras.findByIdAndDelete(id);

        if (!deletedCamera) {
            return res.status(404).send("Security camera not found.");
        }

        res.status(200).json({ message: "Security camera deleted successfully.", deletedCamera });
    } catch (error) {
        console.error("Error deleting security camera:", error);
        res.status(500).send("Failed to delete security camera.");
    }
}

module.exports = { createSecurityCameras, deleteSecurityCamera };