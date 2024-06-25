const { Center } = require("../model/centers")
const asyncHandler = require("express-async-handler")
const ApiError = require("../utils/apiErro")
const { cloudinaryUploadImage } = require("../utils/cloudinary")
const path = require("path")


module.exports.createCenter = asyncHandler(async(req,res, next) => {
  /* if(!req.file) return res.status(400).json({message:'you should have image'})
  const result = await cloudinaryUploadImage(req.file.path)
  const {error} = (req.body);
  if(error){
      return res.status(400).json({message: error.details[0].message});
  } */

  let center = await Center.findOne({name: req.body.name})
  if(center){
      return next(new ApiError(`massege: this is center already exist` , 400))
    }
  center = await Center.create({
    name:req.body.name,
    addresse: req.body.addresse,
    phone: req.body.phone,
  });
  res.status(201).json({data: center})
})

module.exports.updateCenter = asyncHandler(async (req, res, next) => {
  const center = await Center.findByIdAndUpdate(req.params.id ,req.body ,{
    name:true,
  });

  if (!center) {
    return next(new ApiError(`No center for this id ${req.params.id}`, 404));
  }
  // Trigger "save" event when update document
  center.save();
  res.status(200).json({ data: center });
});

module.exports.getCenter = asyncHandler(async (req, res, next) => {
    const center = await Center.findById(req.params.id)
    if (!center) {
      return next(new ApiError(`No center for this id ${req.params.id}`, 404));
    }
    // Trigger "save" event when update document
    center.save();
    res.status(200).json({ data: center });
});

module.exports.deleteCenter = asyncHandler(async (req, res, next) => {
    const center = await Center.findByIdAndDelete(req.params.id)
    if (!center) {
      return next(new ApiError(`No center for this id ${req.params.id}`, 404));
    }
    // Trigger "save" event when update document
    center.save();
    res.status(200).json({});
});

//
module.exports.getAllCenter = asyncHandler(async(req,res,next) =>{
  const center = await Center.find({},'name addresse phone');
  const updatecenter = center.map((cen) =>{
    const phoneStr = String(cen.phone);
    return {
      name: cen.name,
      addresse: cen.addresse,
      phone: phoneStr.startsWith('0') ? phoneStr : '0' + phoneStr
    }
    
  })
  res.status(200).json({message:updatecenter})
})