import express from 'express'
import { addCity ,getAllCity} from '../controllers/city.js';

 const router = express.Router()
// router.get('/getAll', getAll)
 router.post('/addCity', addCity)
router.get('/getAllCity',getAllCity)
export default router;



