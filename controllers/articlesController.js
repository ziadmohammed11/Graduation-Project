const { Articles } = require("../model/articles")
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiErro");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const path = require("path")


/** insert all questinos */
module.exports.postArticlesCtrl = asyncHandler(async(req,res) =>{
    /*if (!req.file) return res.status(400).json({message:'you should have image'})
    const result = await cloudinaryUploadImage(req.file.path)
    const {error} = (req.body);
    if(error){
        return res.status(400).json({message: error.details[0].message});
    }*/
    articless = new Articles({
      question: req.body.question,
      answer: req.body.answer,
    });
     await articless.save();
     res.status(201).json({message:"you Articles successfull"});
})


module.exports.getAllArticlesCtrl = asyncHandler(async(req,res,next) =>{
  let articless = await Articles.find({},'question answer');
  if(!articless){
    return next(new ApiError(`massege: no articless` , 400))
  }
  res.status(200).json({message:articless})
})

module.exports.getArticlesCtrl = asyncHandler(async(req,res,next) =>{
  let articless = await Articles.findById(req.params.id);
  if(!articless){
    return next(new ApiError(`massege: no Articless for this id ${req.params.id}` , 400))
  }
  res.status(200).json({message:articless})
})

module.exports.updateArticlesCtrl = asyncHandler(async(req,res,next) =>{
    let articles = await Articles.findByIdAndUpdate(req.params.id,req.body)
    if(!articles){
       return next(new ApiError(`this is articles undefined`)) 
    }
    await articles.save()
    res.status(201).json({message:articles})
})

module.exports.deleteArticlesCtrl = asyncHandler(async(req,res,next)=>{
    let articles = await Articles.findByIdAndDelete(req.params.id)
    if(!articles){
        return next(new ApiError(`this is articles undefind`))
    }
    res.status(200).json({message: "article is deleted"})
})