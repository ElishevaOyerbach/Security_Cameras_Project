
const jwt = require("jsonwebtoken")


// לjwt  יש 2 פונקציות מרכזיות שבהם נשתמש
function createToken(req, res, next) {
    //  ניצור טוקן, מחרוזת סודית בכל גלישה מחדש של המשתמש באתר 
    // נשלוף  את הפרטים של המשתמש 
    const token = jwt.sign({ password: req.body.password, email: req.params.email ,role:req.params.role}, process.env.SECRET)
    req.token = token
    // req.token = token
    next()
}

// פונקציה זו תוודא שהטוקן שנשלח מהלקוח הוא חתום במחרוזת הסודית של האפליקציה
// אם הוא חתום היא מחזירה את הפרטים של המשתמש
// אם לא היא מחזירה הודעת שגיאה
function verifyToken(req, res, next) {
    try {
        console.log(req.headers["Authorization"])
        const token = req.headers["Authorization"].split(" ")[1]; // שולפים את הטוקן מה־Authorization header
        console.log(token+"token")
        if (!token) return res.status(401).send("No token provided");

        const user = jwt.verify(token, process.env.SECRET);
        if (user.role !== "Administrator") {
            return res.status(403).send("Access denied. Admins only.");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Invalid token");
    }
}

module.exports = { createToken, verifyToken }