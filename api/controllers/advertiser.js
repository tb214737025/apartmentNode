
import jwt from 'jsonwebtoken'
import Advertiser from '../models/advertiser.js'

// התחברות
export const login = (req, res) => {

    // שליפה לפי שם מפתח
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send({ error: `email and password are required!` })
    }
    

    advertiser.find()
        // חיפוש לפי אימייל
        .where({ email: { $eq: email } })
        .then(async users => {
            // לא נמצאו משתמשים מתאימים
            if (users.length == 0) {
                console.log('email not found!');
                return res.status(404).send({ error: `email and password are not match!` })
            }

            // מערך - שליפה לפי מיקום
            let [user] = users

            // הסימה לא תואמת
            if (user.password !== password) {
                console.log('password is not match!');
                return res.status(404).send({ error: `email and password are not match!` })
            }

            // יצירת טוקן:
            // מקבלת שלשה פרמטרים:
            // 1. נתונים של המשתמש מהם יווצר הטוקן - אין לתת נתונים רגישים כמו סיסמה
            // 2. מחרוזת יחודית למערכת
            // 3. אובייקט אפשרויות - לא חובה
            const token = await jwt.sign(
                { phon: user.phon, email },
                process.env.SECRET,
                {
                    // ניתן להגדיר תוקף לטוקן
                    // expiresIn: '1hr' // hours
                    // expiresIn: '1d', // days
                    // expiresIn: '10m', // minutes
                    // expiresIn: '20ms', // mili seconds
                    expiresIn: '10s', // second
                    // expiresIn: '3 months', 
                }
            )

            // המשתמש נמצא - נשלח חזרה לצד לקוח
            res.status(200).send({ user, token })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

// הרשמה
export const register = (req, res) => {

    const { email, password, phon,anotherPhon,apartments } = req.body

    advertiser.find()
        .where({ email: { $eq: email } })
        .then(users => {
            if (users.length > 0) {
                return res.status(400).send({ error: 'email has been exists already!' })
            }
            const newAdvertiser = new advertiser({
                email,
                password,
                phon,
                anotherPhon,
                apartments

            })

            newAdvertiser.save()
                .then(async user => {
                    // יצירת טוקן:
                    // מקבלת שלשה פרמטרים:
                    // 1. נתונים של המשתמש מהם יווצר הטוקן - אין לתת נתונים רגישים כמו סיסמה
                    // 2. מחרוזת יחודית למערכת
                    // 3. אובייקט אפשרויות - לא חובה
                    const token = await jwt.sign(
                        { phon: user.phon, email },
                           process.env.SECRET,
                        {
                            // ניתן להגדיר תוקף לטוקן
                            expiresIn: '1hr' // hours
                            // expiresIn: '1d', // days
                            // expiresIn: '10m', // minutes
                            // expiresIn: '20ms', // mili seconds
                            // expiresIn: '60s', // second
                
                
                          // expiresIn: '3 months', 
                        }
                    )
                    return res.status(200).send({ user, token })
                })
                .catch(err => {
                    retur
                     res.status(500).send({ error: err.message })
                })
        })
}


//לא עובד
export const getAll = (req, res) => {
    Advertiser.findById(req.params.id)//.populate('category')
        .then(apr => {
            res.status(200).send(apr)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

