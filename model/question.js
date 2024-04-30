const mongoose = require("mongoose");

const questionModel = new mongoose.Schema({
    question:{
        type : String,
        require: [true , 'question is require'],
        unique: true,
    },
    image: {
        type: Object,
        default: {
          url: "",
          publicId: null,
       },
    },
    choices: {
        type: Array,
    },
    answer:{
        type : String,
    }
},{
    timestamps:true,
})

const Question = mongoose.model("Question" , questionModel)

module.exports={
    Question,
}

