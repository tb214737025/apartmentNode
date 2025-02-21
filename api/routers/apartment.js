import express from 'express'
import {addApartment,getAllApartment,updateApartment,remove,getById,getByCatgeory, getWhereBig, getWhereSmall,getWherePriceSmall,getWherePriceBig} from '../controllers/apartment.js';
// import { chekGetAllApartment } from '../../middlewares.js';




const router = express.Router()
// router.delete('/remove', remove)
router.post('/addApartment', addApartment)
router.get('/getAllApartment',getAllApartment)
router.patch('/updateApartment/:id',updateApartment)
  // router.delete('/remove/:id/:idAdvertiser', chekGetAllApartment,remove)
 router.get('/getById/:id',getById)
router.get('/getByCatgeory/:id',getByCatgeory)
router.get('/getWhereBig/:num',getWhereBig)
router.get('/getWhereSmall/:num',getWhereSmall)
router.get('/getWherePriceSmall/:num',getWherePriceSmall)
router.get('/getWherePriceBig/:num',getWherePriceBig)
// router.get('/getById/:id',getById)


export default router;
