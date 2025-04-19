const securityCameras=require("../Moduls/SecurityCamerasModule")

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

module.exports = {createSecurityCameras}