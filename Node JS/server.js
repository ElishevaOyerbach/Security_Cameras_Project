require('dotenv').config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); 
const mongoose = require("mongoose");
const app = express(); // אתחול המשתנה app
app.use(express.json()); // חובה כדי לפרסר JSON
app.use(cors());
const { sendEmails } = require('./Middleware/email'); // עדכן את הנתיב לקובץ שלך




const DBpass = process.env.MONGO_PASS;
mongoose.connect(DBpass)
    .then(() => console.log("Connected…"))
    .catch(err => console.log(err));

    
const Administators = require("./Routers/AdministratorsRouter");
const Members = require("./Routers/MembersRouter");
const SecurityCameras = require("./Routers/SecurityCamerasRauter");

app.use('/videos', express.static(path.join(__dirname, 'uploads'))); // הגדרת נתיב לסטטיק של קבצי וידאו
app.use("/Administators", Administators); 
app.use("/Members", Members);
app.use("/SecurityCameras", SecurityCameras);

app.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        await sendEmails(to, subject, text);  // קריאה לפונקציה לשליחת המייל
        res.status(200).send('Email sent successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});




app.listen(8080, () => {
    console.log("server is run...");
});


