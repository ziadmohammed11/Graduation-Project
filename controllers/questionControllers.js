const { Question } = require("../model/question")
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErro")
const {cloudinaryUploadImage , cloudinaryRemoveImage} = require("../utils/cloudinary")
const path = require("path")

/** insert all questinos */
module.exports.postquestionCtrl = asyncHandler(async(req,res) => {
  //1- validation for image 
  if(!req.file){
    return res.status(400).json({message:'you should have image'})
  }
  // 2- upload image 
  //const imagePaht =  path.join(__dirname,`../uploads/${req.file.filename}`)
  const result = await cloudinaryUploadImage(req.file.path)

  //console.log(imagePaht)

  const {error} = (req.body);
  if(error){
      return res.status(400).json({message: error.details[0].message});
  }
  // 3- creat querstion 
  const question = await Question.create({
    question: req.body.question,
    choices: req.body.choices,
    answer: req.body.answer,
    image:{
      url: result.secure_url,
      publicId: result.public_id,
    }
  })
  // 4- send res to client 
  res.status(201).json({message:"you question successfull"})
  // 5- delete the image form the server
  fs.unlinkSync(imagePaht);
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
