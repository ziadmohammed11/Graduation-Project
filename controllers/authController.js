const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User , generateAuthToken} = require("../model/Users");
const ApiError = require("../utils/apiErro");
const sendEmail = require("../utils/sendemail");


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

module.exports.forogotPassword = asyncHandler(async(req,res,next)=>{
    // 1) get user by email 
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(
            new ApiError(`there is no user with that email ${req.body.email}` , 404)
        )
    }
    // 2) if user existe , generate random 6 digits and save it in db
    const resetCode = Math.floor(Math.random()*100000+1).toString()
    const hashedResetCode = crypto
    .createHash('sha256')  
    .update(resetCode)  
    .digest('hex');
    // 3) save hashed password rest code in db
    user.passwordResetCode = resetCode
    // 4) add expiration time for password reset code (10 min) 
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000 ;
    user.passwordResetVerified = false;
    await user.save();
    const message = `Hi ${user.username},\n We received a request to reset the password on your app Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The project Team  ziad your bro`;
    try {
       await sendEmail({
        email:user.email,
        subject: 'Your password reset code (valid for 10 min)',
        message,
       });
    } catch (error) {
        user.passwordResetCode = undefined;
        user.passwordResetExpires = undefined;
        user.passwordResetVerified = undefined;
    
        await user.save();
        return next(new ApiError('There is an error in sending email', 500));
    }
    res
    .status(200)
    .json({ status: 'Success', message: 'Reset code sent to email'});
})

exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
    // 1) Get user based on reset code
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(req.body.resetCode)
      .digest('hex');
    //console.log(hashedResetCode);
    const user = await User.findOne({
      passwordResetCode: req.body.resetCode,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ApiError('Reset code invalid or expired'));
    }
  
    // 2) Reset code valid
    user.passwordResetVerified = true;
    await user.save();
  
    res.status(200).json({
      status: 'Success',
    });
});


exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.newpassword, salt);

  user.password = hashedPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpires = undefined;
  user.passwordResetVerified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token = user.generateAuthToken();
  res.status(200).json({ token });
});