import express from 'express'

 import { login ,register,getAll} from '../controllers/advertiser.js'
 const router = express.Router()

// router.post('/register', register)
 router.post('/login', login)
 router.post('/register',register)
  router.get('/getAll/:id',getAll)

  
 export default router;





 