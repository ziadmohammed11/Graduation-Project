const mongoose = require("mongoose")

const centersModel = new mongoose.Schema({
    name:{
        type: String,
        unique: [true , 'this is center already exist'],
        require: [true , 'name is require'],
       
    },
    addresse:{
        type: String
    },
    image: {
        type: Object,
        default: {
          url: "",
          publicId: null,
       },
    },
    phone: Number,
},{
    timestamps:true
})

const Center = mongoose.model("Center" , centersModel);

module.exports={
    Center,
}