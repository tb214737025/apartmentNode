// import Category from "../models/category.js"
// import Apartment from "../models/apartment.js"


// export const getAll = (req, res) => {
//     Category.find()
//         .then(list => {
//             res.status(200).send(list)
//         })
//         .catch(err => {
//             res.status(500).send({ error: err.message })
//         })
// }

// export const create = (req, res) => {

//     const {name} = req.body
//     // יצירת מאמר חדש
//     const newCategory = new Category({
//         name,
//         Apartments:[] //התחול הדירות
//          })

//     newCategory.save()
//         // רק אחרי שהוספנו את הכתבה - 
//         // נוכל לעדכן את המערך של הכתבות בקטגוריה -
//         // הוספה של איבר חדש - קוד כתבה
//         .then(category => {
//             return res.status(200).send({ message: `create category${category._id} succeed!` })
//         })
//         .catch(err => {
//             return res.status(500).send({ error: err.message })
//         })

// }
//  import category from "../models/category"



import Category from '../models/category.js'

export const getAllCategory=(req,res)=>{
Category.find()
.then(category=>{
    res.status(200).send(category)
})
.catch(err=>
    res.status(500).send({error: err.massage}))
}

export const addCategory=(req,res)=>{
const {nameCategory}=req.body
const newCategory = new Category({
     nameCategory,
     apartments:[]
})
newCategory.save()
.then(category=>{
return res.status(200).send({massage:`create category${category._id} succeed!`})
})
.catch(err=>{
    return res.status(500).send({error: err.massage})
})


}