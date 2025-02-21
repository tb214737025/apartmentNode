import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({

    nameApartment: {
        type: String,
        // require: false,
    },
    description: String,
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        // require: true
    },
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'City',
        // require: true
    },
    advertist: {
        type: mongoose.Types.ObjectId,
        ref: 'Advertist',
        // require: true
    },
    address:String,
    countBed:Number,
    price:Number,
    add:String,//תוספים
    img:String
})

export default mongoose.model('Apartment', apartmentSchema)