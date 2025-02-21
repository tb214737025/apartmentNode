import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import advertiserR from './api/routers/advertiser.js'
import cityR from './api/routers/city.js'
import categoryR from './api/routers/category.js'
import apartmentR from './api/routers/apartment.js'


const app = express()
const port = 3001

// המנגנון שמכיר את משתני הסביבה לכל הפרויקט
dotenv.config();

app.use(bodyParser.json())
app.use(cors())

// mongoose.connect - פונקצית חיבור למסד הנתונים 
// uri - מחרוזת חיבור למסד הנתונים
// mongodb://localhost:27017/Articles_DB

// גישה למשתני סביבה
// process.env.PARAMETER_NAME
mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('connect to mongoDB! 👍😁');
    })
    .catch(err => {
        console.log({ error: err.message });
    })
    
 app.use('/advertiser', advertiserR)
 
app.use('/category', categoryR)
app.use('/city', cityR)
app.use('/apartment',apartmentR)
app.listen(port, () => {  
    console.log(`my application is listening on http://localhost:${port}`);
})
