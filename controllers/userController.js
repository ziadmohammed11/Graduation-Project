const asyncHandler = require("express-async-handler");
const { User } = require("../model/Users");
const { Child } = require("../model/Child");
const ApiError = require("../utils/apierro");

/**-----------------------------------------------
 * @desc    Get Users
 * @route   /api/users/getusers
 * @method  Get
 * @access  public
------------------------------------------------*/
module.exports.getAllUsers = asyncHandler(async(req,res) =>{
    
    const users = await User.find()
    res.status(201).json({message:users});
    // console.log(Child)
})


/**-----------------------------------------------
 * @desc    Get User
 * @route   /api/users/:id
 * @method  Get
 * @access  public
------------------------------------------------*/
module.exports.getUser = asyncHandler(async(req,res,next) => {
    const {id} = req.params;
    const user = await User.findById(id).select("-password").populate({
        path:"childs",
        select:"name birthday -user"
    })
    if(!user){
        return next(new ApiError(`No user for this id (${id})`, 404))
    
    }
    res.status(200).json({message: user}) 
})

/**-----------------------------------------------
 * @desc    Update User
 * @route   /api/users/:id
 * @method  Put
 * @access  public
------------------------------------------------*/
module.exports.getUserAndUpdate = asyncHandler(async(req,res,next) => {
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, req.body)
    if(!user){
        return next(new ApiError(`No user for this id (${id})`, 404))
    
    }
    user.save()
    res.status(200).json({message: user}) 
})

/**-----------------------------------------------
 * @desc    Delete User
 * @route   /api/users/:id
 * @method  Delete
 * @access  public
------------------------------------------------*/
module.exports.getUserAndDelete = asyncHandler(async(req,res,next) => {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id)
    if(!user){
        return next(new ApiError(`No user for this id (${id})`, 404))
    
    }
   // user.remove()
    res.status(204).json({message: done }) 
})