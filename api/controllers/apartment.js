
import apartment from "../models/apartment.js"
import Apartment from "../models/apartment.js"
import category from "../models/category.js"
import Category from "../models/category.js"
import Advertist from "../models/advertiser.js"
import City from "../models/city.js"
import city from "../models/city.js"

export const getAllApartment=(req,res)=>{
    Apartment.find().populate('category').populate('city').then(ap=>{
        res.status(200).send(ap)
    })
    .catch(err=>{
        res.status(500).send({error:err.massage})
    })
}

export const addApartment=(req,res)=>{
    const {nameApartment,description,category,city,advertist,address,countBed,price,add,img} = req.body

    const newApartment = new Apartment({
        nameApartment,
        description,
        category,
        city,
        advertist,
        countBed,
        address,
        price,
        add,
        img
 })

 newApartment.save().then(async ap=>{
let x = await Category.findByIdAndUpdate(ap.category, { $push: { apartments: ap._id } })
let y = await City.findByIdAndUpdate(ap.city, { $push: { apartments: ap._id } })
let z = await Advertist.findByIdAndUpdate(ap.ad, { $push: { apartments: ap._id } })
//    if (!x||!y) {    
//          return res.status(500).send({ message: `create article ${ap._id} succeed! update category failed!` })
//     }
  return res.status(200).send({massage:`create apartment${ap._id} succeed!`})})
  .catch(err=>{
    return res.status(500).send({error: err.massage})

   
 
    
  })}




 export const updateApartment=(req,res)=>{

        // לא ניתן לעדכן את קוד הכתבה
        const { _id } = req.body
    
        if (_id) {
            return res.status(403).send({ error: `update id is forbidden!` })
        }
    
        const { id } = req.params
    
        // id - איזה כתבה לעדכן - מחפש לפי קוד
        // req.body - איזה נתונים לשנות - הערכים החדשים
        // patch - לא חייבים לשלוח את כל הנתונים - יעדכן רק את השדות שנשלחו
        // אובייקט אפשרויות
        // { new: true } -  מחזיר את האובייקט אחרי השינוי
        Apartment.findByIdAndUpdate(id, req.body)
            // האובייקט שנשלח כתשובה - לפני השינוי
            .then(async apartment => {
                // העדכון הצליח
                // בדיקה האם עדכנו את הקטגוריה - האם היא נשלחה בגוף הבקשה
                // מחיקת קוד הכתבה מהקטגוריה הישנה
                // הוספת קוד הכתבה לקטגוריה החדשה
                const { category } = req.body
    
                if (category) {
                    // article.category - החזרנו את האובייקט לפני שהשינוי- הקטגוריה הישנה
                    let x = await Category.findByIdAndUpdate(apartment.category, { $pull: { category: category._id } })
                    // category - נשלח בגוף הבקשה - חדשה
                    let y = await Category.findByIdAndUpdate(category, { $push: { category: category._id } })
                    if (!x || !y) {
                        return res.status(200).send({ message: `update article ${category._id} succeed!, upadte categories failed!` })
                    }
                }
                return res.status(200).send({ message: `update article ${category._id} succeed!` })
            })
            .catch(err => {
                res.status(500).send({ error: err.message })
            })
        }


export const remove = (req, res) => {
console.log("id:",req.params.id);

Apartment.findByIdAndDelete(req.params.id)
        .then(async ar => {
            if (!ar) {
                return res.status(404).send({ error: `article not found!` })
            }
            let x = await Category.findByIdAndUpdate(ar.category, { $pull: { category: category._id } })
            if (!x) {
                return res.status(200).send({ message: `delete article ${apartment._id} succeed! update category failed!` })
            }
            res.status(200).send({ message: `delete article ${apartment._id} succeed!` })
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}


export const getByCatgeory = (req, res) => {
    Apartment.find().where({category:{ $eq: req.params.id } })
        .then(apartments => {
            console.log(apartments)
            res.status(200).send({ apartments })
        })



        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getByCity = (req, res) => {
  Apartment.find().where({city:{ $eq: req.params.id } })
        .then(apartment => {
          //  console.log(apartment)
            res.status(200).send({ apartment })
        })
  
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getById = (req, res) => {
    Apartment.findById(req.params.id).populate('category')
        .then(apr => {
            res.status(200).send(apr)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getWhereBig = (req, res) => {
    const { num } = req.params
    Apartment.find()
      

        .where({
            
                // $or: [
                 countBed: { $gt: num } 
            
           
        })
        .then(apr => {
            // let list = products.filter(p => p.price > 15)
            res.status(200).send(apr)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getWhereSmall = (req, res) => {
    const { num } = req.params
    Apartment.find()
              .where({
                  
                 countBed: { $lte: num } 
                               })
        .then(apr => {
            // let list = products.filter(p => p.price > 15)
            res.status(200).send(apr)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getWherePriceSmall = (req, res) => {
    const { num } = req.params
    Apartment.find()
              .where({
                  
                 price: { $lte: num } 
                               })
        .then(apr => {
            // let list = products.filter(p => p.price > 15)
            res.status(200).send(apr)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}



export const getWherePriceBig = (req, res) => {
    const { num } = req.params

   
    
    Apartment.find()
              .where({
                  
                 price: { $gt: num } 
                               })
        .then(apr => {
            // let list = products.filter(p => p.price > 15)
            res.status(200).send(apr)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}




