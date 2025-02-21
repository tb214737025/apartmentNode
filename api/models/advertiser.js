import mongoose from "mongoose";

const advertistSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        //  match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}$/
    },
    password: {
        type: String,
        require: true
    },
    phon:{
      type:String,
      require: true,
      
     } ,
     anotherPhon:{
        type:String,
        require: false,
        
    
     },
     //מערך דירות
    apartments: [{
        require: false,
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
    
})

export default mongoose.model('Advertist',advertistSchema ) 