const router = require("express").Router();
const {registerUserCtrl , loginUserCtrl, forogotPassword, verifyPassResetCode, resetPassword } = require("../controllers/authController");
const { signupValidator , loginValidator} = require("../utils/validators/authValidator");




// /api/auth/register
router.post("/register", signupValidator, registerUserCtrl);

// /api/auth/login
router.post("/login", loginValidator , loginUserCtrl);

// /api/auth/forgetpassword
router.post("/forget-password", forogotPassword );

router.post('/verifypassresetcode' , verifyPassResetCode)

router.post("/resetpassword" , resetPassword)

module.exports = router;