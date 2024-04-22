const mongoose = require("mongoose");

const articlesModel = new mongoose.Schema({
    question:{
        type : String,
        require: [true , 'question is require'],
    },
    answer:{
        type : String,
    }
},{
    timestamps:true,
})

const Articles = mongoose.model("Articles" , articlesModel)

module.exports={
    Articles,
}