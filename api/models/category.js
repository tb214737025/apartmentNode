import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    nameCategory: {
        type: String,
        // חובה - not null
        require: true,
        maxLength: 50
    },

  //מערך דירות
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})

export default mongoose.model('Category', categorySchema)