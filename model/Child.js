const mongoose = require("mongoose");

const childModel = new mongoose.Schema({
    name:{
        type : String,
        require: [true , 'name is require'],
        unique: true,
    },
    birthday: Date,
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'child must be belong to parent user'],
    }
},{
    timestamps:true,
})

const Child = mongoose.model("Child" , childModel)

module.exports={
    Child,
}