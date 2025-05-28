const Administrators = require("../Moduls/AdministatorsModule");
const Members = require("../Moduls/MembersModule");
const SecurityCameras = require("../Moduls/SecurityCamerasModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { sendEmail } = require('../Middleware/email'); // עדכן את הנתיב לפי מיקום הקובץ email.js
const mongoose = require("mongoose");


// יצירת מנהל מצלמות אבטחה חדש
async function createAdministrator(req, res) {
    try {
        const { email, phone, password, name } = req.body;

        // בדיקה אם כל השדות החובה קיימים
        if (!email || !phone || !password || !name) {
            return res.status(400).send("Missing required fields: email, phone, password, or name.");
        }

        // הצפנת הסיסמה
        const hashedPassword = await bcrypt.hash(password, 10);

        // יצירת אובייקט מנהל חדש עם הסיסמה המוצפנת
        let newAdmin = new Administrators({
            ...req.body,
            password: hashedPassword // שמירה של הסיסמה המוצפנת
        });

        await newAdmin.save();

        const token = jwt.sign(
            { id: newAdmin._id, role: "Administrator" },
            process.env.SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).send({
            message: "Administrator created successfully!",
            token: token,
            name: newAdmin.name,
            _id: newAdmin._id,
            email: newAdmin.email,
            phone: newAdmin.phone,
            role: "Administrator"
        });

    } catch (error) {
        console.error("Error creating administrator:", error);
        res.status(500).send("Failed to create administrator.");
    }
}

// התחברות של מנהל מצלמות אבטחה קיים
async function loginAdministrator(req, res) {
    try {
        const { email, password } = req.body;

        // חיפוש המנהל בטבלת המנהלים
        let user = await Administrators.findOne({ email });
        let role = "Administrator";

        if (!user) {
            // אם לא נמצא בטבלת המנהלים, חפש בטבלת העובדים
            user = await Members.findOne({ email });
            role = "Member";
        }

        // אם המשתמש לא נמצא
        if (!user) {
            return res.status(401).send("Invalid email or password.");
        }

        // השוואת הסיסמה
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send("Invalid email or password.");
        }

        // יצירת טוקן
        const token = jwt.sign(
            { id: user._id, role: role },
            process.env.SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).send({
            message: "Login successful!",
            token: token,
            role: role,
            user: user  // כאן נמצא גם _id של MongoDB
        });
    } catch (error) {
        console.error("Error logging in administrator:", error);
        res.status(500).send("Failed to log in administrator.");
    }
}

// עדכון מנהל מצלמות אבטחה קיים
async function updateAdministrator(req, res) {
    try {
        const { id } = req.params;
        const updatedAdmin = await Administrators.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedAdmin) {
            return res.status(404).send("Administrator not found.");
        }

        res.status(200).send("Administrator updated successfully!");
    } catch (error) {
        console.error("Error updating administrator:", error);
        res.status(500).send("Failed to update administrator.");
    }
}

// קבלת מנהל לפי מזהה
async function getAdministratorById(req, res) {
    try {
        const { id } = req.params;
        const admin = await Administrators.findById(id);

        if (!admin) {
            return res.status(404).send("Administrator not found.");
        }

        res.status(200).json(admin);
    } catch (error) {
        console.error("Error fetching administrator:", error);
        res.status(500).send("Failed to fetch administrator.");
    }
}

// קבלת כל העובדים של מנהל זה
async function getAllMembersByAdministrator(req, res) {
    try {
        const { id } = req.params;
        const members = await Members.find({ administartorID: id });

        if (!members) {
            return res.status(404).send("No members found for this administrator.");
        }

        res.status(200).json(members);
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).send("Failed to fetch members.");
    }
}

// קבלת כל השמות של העובדים של מנהל זה
async function getAllMembersNamesByAdministrator(req, res) {
    try {
        const { id } = req.params;
        const members = await Members.find({ administartorID: id }).select('name');

        if (!members) {
            return res.status(404).send("No members found for this administrator.");
        }

        res.status(200).json(members);
    } catch (error) {
        console.error("Error fetching members:", error);
        res.status(500).send("Failed to fetch members.");
    }
}

// יצירת עובד חדש למנהל זה
async function createMemberByAdministrator(req, res) {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const { id } = req.params;

        let newMember = new Members({
            ...req.body,
            administartorID: id,
            password: hashedPassword
        });

        await newMember.save();

        // עדכון מערך arrMembers של המנהל
        await Administrators.findByIdAndUpdate(
            id,
            { $push: { arrMembers: newMember._id } },
            { new: true }
        );

        res.status(201).send("Member created successfully!");
    } catch (error) {
        console.error("Error creating member:", error);
        res.status(500).send("Failed to create member.");
    }
}

// יצירת מצלמת אבטחה חדשה למנהל זה
async function createSecurityCamerasByAdministrator(req, res) {
    try {
        const { id } = req.params;

        if (!req.file) {
            return res.status(400).send("No video file uploaded.");
        }

        const newSecurityCamera = new SecurityCameras({
            IDsecurityCamera: Math.floor(Math.random() * 1000000),
            length: req.body.length,
            filePath: req.file.path,
            administartorID: req.body.administartorID
        });

        await newSecurityCamera.save();

        // עדכון מערך arrSecurityCameras של המנהל
        const updatedAdmin = await Administrators.findByIdAndUpdate(
            id,
            { $push: { arrSecurityCameras: newSecurityCamera._id } },
            { new: true }
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

// קבלת כל מצלמות האבטחה של המנהל
async function getAllSecurityCamerasByAdministrator(req, res) {
    try {
        const { id } = req.params;
        const cameras = await SecurityCameras.find({ administartorID: id });

        if (!cameras) {
            return res.status(404).send("No security cameras found for this administrator.");
        }

        res.status(200).json(cameras);
    } catch (error) {
        console.error("Error fetching security cameras:", error);
        res.status(500).send("Failed to fetch security cameras.");
    }
}

// קבלת 4 מצלמות האבטחה האחרונות של המנהל
async function getLast4SecurityCamerasByAdministrator(req, res) {
  try {
    const { id } = req.params;

    const cameras = await SecurityCameras.find({ administartorID: id })
      .sort({ date: -1 }) // שדה מיון לפי date
      .limit(4);

    if (!cameras || cameras.length === 0) {
      // מחזיר מערך של 4 אובייקטים ריקים
      return res.status(200).json([{}, {}, {}, {}]);
    }

    // אם יש פחות מ-4 מצלמות, משלים עם אובייקטים ריקים
    while (cameras.length < 4) {
      cameras.push({});
    }

    res.status(200).json(cameras);
  }catch (error) {
    console.error("Error fetching security cameras:", error);
    res.status(500).send("Failed to fetch security cameras.");
  }
}






// מחיקת עובד לפי מזהה למנהל זה
async function deleteMemberByAdministrator(req, res) {
    try {
        const { id } = req.params;
        let { memberId } = req.body;

        // מחיקת העובד ממסד הנתונים
        await Members.findByIdAndDelete(memberId);

        // עדכון מערך arrMembers של המנהל
        await Administrators.findByIdAndUpdate(
            id,
            { $pull: { arrMembers: memberId } },
            { new: true }
        );

        res.status(200).send("Member deleted successfully!");
    } catch (error) {
        console.error("Error deleting member:", error);
        res.status(500).send("Failed to delete member.");
    }
}
//פונקציה המחזירה את כמות העובדים שיש למנהל זה 
async function getMemberCountByAdministrator(req, res) {
    try {
        const { id } = req.params;

        const administrator = await Administrators.findById(id).select('arrMembers');

        if (!administrator) {
            return res.status(404).send("Administrator not found.");
        }

        const memberCount = administrator.arrMembers.length;

        res.status(200).json({ memberCount });
    } catch (error) {
        console.error("Error fetching member count:", error);
        res.status(500).send("Failed to get member count.");
    }
}
async function updateMemberByAdministrator(req, res) {
    try {
        const { id } = req.params;
        const { memberId } = req.body;

        // עדכון פרטי העובד
        const updatedMember = await Members.findByIdAndUpdate(memberId, req.body, { new: true });

        if (!updatedMember) {
            return res.status(404).send("Member not found.");
        }

        res.status(200).send("Member updated successfully!");
    } catch (error) {
        console.error("Error updating member:", error);
        res.status(500).send("Failed to update member.");
    }
}
async function getCameraCountByAdministrator(req, res) {
    try {
        const { id } = req.params;

        const administrator = await Administrators.findById(id).select('arrSecurityCameras');

        if (!administrator) {
            return res.status(404).send("Administrator not found.");
        }

        const cameraCount = administrator.arrSecurityCameras.length;

        res.status(200).json({ cameraCount });
    } catch (error) {
        console.error("Error fetching camera count:", error);
        res.status(500).send("Failed to get camera count.");
    }
}
//פונקציה המחזירה את כמות מצלמות האבטחה שהועלו בשבוע האחרון על ידי המנהל
async function getRecentCameraCountByAdministrator(req, res) {
    try {
        const { id } = req.params; // זהו ה־ID של המנהל

        // מחשבים את תאריך לפני שבוע
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // סופרים כמה מצלמות של המנהל הועלו בשבוע האחרון
        const cameraCount = await SecurityCameras.countDocuments({
            administartorID: id,
            date: { $gte: oneWeekAgo }
        });

        res.status(200).json({ cameraCount });
    } catch (error) {
        console.error("Error fetching recent camera count:", error);
        res.status(500).send("Failed to get camera count.");
    }
}
async function getUserById(req, res) {
    try {
        const { id } = req.params;

        // ננסה קודם למצוא את המשתמש בטבלת המנהלים
        let user = await Administrators.findById(id);
        if (user) {
            return res.status(200).json({ role: "Administrator", user });
        }

        // אם לא נמצא, ננסה בטבלת העובדים
        user = await Members.findById(id);
        if (user) {
            return res.status(200).json({ role: "Member", user });
        }

        // לא נמצא בשום מקום
        return res.status(404).send("User not found.");

    } catch (error) {
        console.error("Error retrieving user by ID:", error);
        res.status(500).send("Failed to retrieve user.");
    }
}
// POST /api/request-access
async function requestAccessFromAdmin(req, res) {
    try {
        const { memberId, accessType, text } = req.body;

        // שלב 1: מציאת העובד
        const member = await Members.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: "Member not found." });
        }

        // שלב 2: שליפת מזהה המנהל מהעובד
        const administratorId = member.administartorID;
        if (!administratorId) {
            return res.status(400).json({ message: "This member has no administrator assigned." });
        }

        // שלב 3: שליפת המנהל עצמו
        const admin = await Administrators.findById(administratorId);
        if (!admin) {
            return res.status(404).json({ message: "Administrator not found." });
        }

        // שלב 4: יצירת בקשה חדשה
        const newRequest = {
            memberId,
            accessType,
            text,
            status: "Pending", // אפשר גם לא לציין, כי זה ברירת מחדל
            dateRequested: new Date()
        };

        // שלב 5: הוספה למערך ושמירה
        admin.arrAskForAccess.push(newRequest);
        await admin.save();

        res.status(201).json({ message: "Access request submitted successfully." });

    } catch (error) {
        console.error("Error while submitting access request:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}
// POST /api/approve-request
async function approveAccessRequest(req, res) {
  try {
    const { memberId, accessType, dateRequested } = req.body;

    // מציאת העובד
    const member = await Members.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found." });
    }

    const administratorId = member.administartorID;
    if (!administratorId) {
      return res.status(400).json({ message: "This member has no administrator assigned." });
    }

    const admin = await Administrators.findById(administratorId);
    if (!admin) {
      return res.status(404).json({ message: "Administrator not found." });
    }

    // מחיקת הבקשה הספציפית מתוך המערך
    admin.arrAskForAccess = admin.arrAskForAccess.filter(
      (req) =>
        !(
          req.memberId.toString() === memberId &&
          req.accessType === accessType &&
          new Date(req.dateRequested).toISOString() === new Date(dateRequested).toISOString()
        )
    );

    await admin.save();

    res.status(200).json({ message: "Access request approved and removed." });

  } catch (error) {
    console.error("Error while approving access request:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}


module.exports = {
    getLast4SecurityCamerasByAdministrator,
    getRecentCameraCountByAdministrator,
    getCameraCountByAdministrator,
    getMemberCountByAdministrator,
    createAdministrator,
    updateAdministrator,
    getAdministratorById,
    getAllMembersByAdministrator,
    createMemberByAdministrator,
    getAllMembersNamesByAdministrator,
    createSecurityCamerasByAdministrator,
    loginAdministrator,
    deleteMemberByAdministrator,
    getAllSecurityCamerasByAdministrator,
    updateMemberByAdministrator,
    getUserById,
    requestAccessFromAdmin,
    approveAccessRequest
};
