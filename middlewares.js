
//Authorization
// export const Authorization = (req, res, next) => {
//     if (!req.headers.authorization) {
//         // אין הרשאה
//         return res.status(401).send({ error: 'Authorization failed!' })
//     }

//     const token = req.headers.authorization.split(' ')[1]

//     if (!token) {
//         return res.status(401).send({ error: 'Authorization failed!' })
//     }

//     // decoded - פיענוח
//     jwt.verify(token, process.env.SECRET, (error, decoded) => {
//         if (error || !decoded) {
//             // האימות נכשל
//             return res.status(401).send({ error: 'Authentication failed!' })
//         }
//         if (decoded) {
//             // האובייקט יכיל את הנתונים של המשתמש לפיהם נוצר הטוקן
//             // באם יהיה צורך נוכל לשמור אותם באובייקט הבקשה ואז להשתמש בפונקציות הבאות
//             next()
//         }
//     })

// }
import jwt from "jsonwebtoken"
import Apartment from "./api/models/apartment.js"

export const checkToken = (req, res, next) => {
    if (!req.headers.authorization) {
        // אין הרשאה
        return res.status(401).send({ error: 'Authorization failed!' })
    }
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).send({ error: 'Authorization failed!' })
    }

    // decoded - פיענוח
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error || !decoded) {
            console.log(error,decoded)
            // האימות נכשל
            return res.status(401).send({ error: 'Authentication failed!' })
        }
        if (decoded) {
            // האובייקט יכיל את הנתונים של המשתמש לפיהם נוצר הטוקן
            // באם יהיה צורך נוכל לשמור אותם באובייקט הבקשה ואז להשתמש בפונקציות הבאות
            next()
        }
    })

}

// export const chekGetAllApartment=(req,res,next)=>{
//     Apartment.findById(req.params.id)//.populate('category')
//     .then(apr => {
//         if(apr.advertist== req.params.idAdvertiser)
//             return next()
//         else 
//         return res.send("no")
//        // res.status(200).send(apr)
//     })
//     .catch(err => {
//         return res.status(500).send({ error: err.message })
//     })
// }

