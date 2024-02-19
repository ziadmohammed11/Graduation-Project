const { Question } = require("../model/question")
const asyncHandler = require("express-async-handler");

/** insert all questinos */
module.exports.postquestionCtrl = asyncHandler(async(req,res) =>{
    const {error} = (req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    luestion = new Question({
      question: req.body.question,
      answer: req.body.answer,
    });
     await luestion.save();
     res.status(201).json({message:"you question successfull"});

})

