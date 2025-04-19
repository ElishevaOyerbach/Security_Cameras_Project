require('dotenv').config();
const express =require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const { createToken, verifyToken } = require("./Middleware/auth"); 

const app = express()
app.use(cors())
const DBpass = process.env.MONGO_PASS;


mongoose.connect(DBpass)
.then(() => console.log("Connected…")).catch(err => console.log(err))

app.use(express.json()); // חובה כדי לפרסר JSON


const Administrators = require("./Routers/AdministratorsRouter");
const Members = require("./Routers/MembersRouter");
const SecurityCameras = require("./Routers/SecurityCamerasRouter");


app.use("/Administrators", Administrators);
app.use("/Members", Members);
app.use("/SecurityCameras", SecurityCameras);


app.listen(8080, ()=>{
    console.log("server is run...")       
})