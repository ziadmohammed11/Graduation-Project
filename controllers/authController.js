const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User , generateAuthToken} = require("../model/Users");
const ApiError = require('../utils/apiErro')


/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
------------------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async(req,res,next) =>{
     //is user already exists 
    let user = await User.findOne({email: req.body.email})
    if(user){
      return next(new ApiError( `message: user exists` , 400))
     //return res.status(400).json({message:"user exists"})
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    user = new User({
      username: req.body.username,
       email: req.body.email,
      password: hashedPassword,
    });
     await user.save();
     res.status(201).json({message:"you register successfull"});
})
/**-----------------------------------------------
 * @desc    Login User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async(req, res) =>{
    // is user exist
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({message:"invaild email or password"});
    }
    // check the password
    const isPasswordMath = await bcrypt.compare(req.body.password, user.password) 
    if(!isPasswordMath){
        return res.status(400).json({message:"invaild email or password"});
    }
    // generate token jwt
    const token = user.generateAuthToken();

    res.status(201).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        profilePhoto: user.profilePhoto,
        token,
    });
})

