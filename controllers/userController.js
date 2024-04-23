const asyncHandler = require("express-async-handler");
const { User } = require("../model/Users");
const ApiError = require("../utils/apiErro")
const path = require("path")
const {cloudinaryUploadImage,cloudinaryRemoveImage} = require("../utils/cloudinary");
const fs = require("fs")

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
/**-----------------------------------------------
 * @desc    upload profilephoto User
 * @route   /api/users/uploadprofile
 * @method  put
 * @access  public
------------------------------------------------*/
module.exports.profilePohtoUpload = asyncHandler(async(req,res,next) => {
    if(!req.file){
        return res.status(400).json({message: "no file provided"})
    }
    // 2. Get the path to the image
    const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`)
    // 3. Upload to cloudinary
    const resolt = await cloudinaryUploadImage(imagePath)
    // 4. Get the user from DB
    const user = await User.findById(req.user.id)
    // 5. Delete the old profile photo if exist
    if (user.profilePhoto?.publicId !== null) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
   }
   // 6. Change the profilePhoto field in the DB
   user.profilePhoto = {
    url: resolt.secure_url,
    publicId: resolt.public_id,
   }
   await user.save();
   // 7. Send response to client
   res.status(200).json({message:"your profile photo uploaded" , 
   profilePhoto:{url:resolt.secure_url , publicId: resolt.public_id}})
   // 8. Remvoe image from the server
   fs.unlinkSync(imagePath)
})
