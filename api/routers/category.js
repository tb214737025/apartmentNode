 import express from 'express'
 import {addCategory,getAllCategory} from '../controllers/category.js'

 const router = express.Router()
router.get('/getAllCategory', getAllCategory)
router.post('/addCategory', addCategory)

export default router;


