const asyncHandler = require("express-async-handler")
const ApiError = require("../utils/apiErro")
const { Child } = require("../model/Child")



module.exports.createChild = asyncHandler(async(req,res, next) => {
    let child = await Child.findOne({name: req.body.name})
    if(child){
        return next(new ApiError(`we have name for this child ${req.body.name} `, 404))
    }
    child = await Child.create(req.body);
    res.status(201).json({data: child})
})

module.exports.updateChild = asyncHandler(async (req, res, next) => {
  const child = await Child.findByIdAndUpdate(req.params.id ,req.body ,{
    name:true,
  });

  if (!child) {
    return next(new ApiError(`No Child for this id ${req.params.id}`, 404));
  }
  // Trigger "save" event when update document
  child.save();
  res.status(200).json({ data: child });
});

module.exports.getChild = asyncHandler(async (req, res, next) => {
    const child = await Child.findById(req.params.id).populate({
      path:"user",
      select:"username"
    })
    if (!child) {
      return next(new ApiError(`No Child for this id ${req.params.id}`, 404));
    }
    // Trigger "save" event when update document
    res.status(200).json({ data: child });
});


module.exports.getAllChild = asyncHandler(async(req,res,next) =>{
  const child = await Child.find();
  res.status(200).json(child)
})