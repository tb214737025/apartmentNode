

import City from "../models/city.js"

export const getAllCity=(req,res)=>{
    City.find().then(city=> {
    res.status(200).send(city)
        })
        .catch(err=> {
        res.status(500).send({ error: err.message })

        })
}


 export const addCity = (req,res)=>{
    const {nameCity}=req.body
     const newCity= new City({
        nameCity,
         apartment:[]

     })
     newCity.save()
    .then(city => {
          return res.status(200).send({ message: `create city ${city._id} succeed!` })
        })
         .catch(err => {
           return res.status(500).send({ error: err.message })
        })

 }


 