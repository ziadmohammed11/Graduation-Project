const { Question } = require("../model/question")
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErro")

/** insert all questinos */
module.exports.postquestionCtrl = asyncHandler(async(req,res) =>{
    const {error} = (req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }
    questions = new Question({
      question: req.body.question,
      choices: req.body.choices,
      answer: req.body.answer,
      image: req.body.image
    });
     await questions.save();
     res.status(201).json({message:"you question successfull"});
})


module.exports.getAllQuestionCtrl = asyncHandler(async(req,res,next) =>{
  let questions = await Question.find();
  if(!questions){
    return next(new ApiError(`massege: no questions` , 400))
  }
  res.status(200).json({message:questions})
})

module.exports.getQuestionCtrl = asyncHandler(async(req,res,next) =>{
  let questions = await Question.findById(req.params.id);
  if(!questions){
    return next(new ApiError(`massege: no questions for this id ${req.params.id}` , 400))
  }
  res.status(200).json({message:questions})
})

module.exports.updateQuestionCtrl = asyncHandler(async(req,res,next) =>{
  let questions = await Question.findByIdAndUpdate(req.params.id,req.body)
  if(!questions){
     return next(new ApiError(`this is question undefined`)) 
  }
  await questions.save()
  res.status(201).json({message:questions})
})

module.exports.deleteQuestionCtrl = asyncHandler(async(req,res,next)=>{
  let questions = await Question.findByIdAndDelete(req.params.id)
  if(!questions){
      return next(new ApiError(`this is questions undefind`))
  }
  res.status(200).json({message: "questions is deleted"})
})
