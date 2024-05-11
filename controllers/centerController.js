const { Center } = require("../model/centers")
const asyncHandler = require("express-async-handler")
const ApiError = require("../utils/apiErro")


module.exports.createCenter = asyncHandler(async(req,res, next) => {
    let center = await Center.findOne({name: req.body.name})
    if(center){
        return next(new ApiError(`massege: this is center already exist` , 400))
    }
    center = await Center.create(req.body);
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
  const center = await Center.find();
  res.status(200).json({message:center})
})