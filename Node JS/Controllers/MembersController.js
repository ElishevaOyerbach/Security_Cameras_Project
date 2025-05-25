
const Members=require("../Moduls/MembersModule")

async function getAllSecurityCamerasByMember(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה העובד מהפרמטרים של הבקשה
        const member = await Members.findById(id).populate('arrSecurityCameras'); // חיפוש העובד במסד הנתונים והבאת מצלמות האבטחה שלו
        if (!member) {
            return res.status(404).send("Member not found.");
        }
        const securityCameras = member.arrSecurityCameras; // הוצאת מצלמות האבטחה של העובד
        res.status(200).json(securityCameras); // החזרת כל מצלמות האבטחה שנמצאו
    } catch (error) {
        console.error("Error fetching security cameras:", error);
        res.status(500).send("Failed to fetch security cameras.");
    }
}
//קבלת כל הסכמות של עובד זה
//קבלת כל הסכמות של עובד זה
async function getAllAnalysisSchemaByMember(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה העובד מהפרמטרים של הבקשה
        const member = await Members.findById(id).populate('arrAnalysisSchema'); // חיפוש העובד במסד הנתונים והבאת הסכמות שלו
        if (!member) {
            return res.status(404).send("Member not found.");
        }
        const analysisSchema = member.arrAnalysisSchema; // הוצאת הסכמות של העובד
        res.status(200).json(analysisSchema); // החזרת כל הסכמות שנמצאו
    } catch (error) {
        console.error("Error fetching analysis schema:", error);
        res.status(500).send("Failed to fetch analysis schema.");
    }
}


async function getAdministratorIdByMember(req, res) {
    try {
        const { id } = req.params; // קבלת מזהה העובד

        const member = await Members.findById(id); // חיפוש העובד

        if (!member) {
            return res.status(404).send("Member not found.");
        }

        const administratorId = member.administartorID; // שליפת מזהה המנהל

        res.status(200).json({ administratorId }); // החזרה כ־JSON

    } catch (error) {
        console.error("Error fetching administrator ID:", error);
        res.status(500).send("Failed to fetch administrator ID.");
    }
}
// ייצוא הפונקציות שנוצרו
module.exports={ getAllSecurityCamerasByMember,getAllAnalysisSchemaByMember,getAdministratorIdByMember}
 







