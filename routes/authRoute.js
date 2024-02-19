const router = require("express").Router();
const {registerUserCtrl , loginUserCtrl } = require("../controllers/authController");
const { signupValidator , loginValidator} = require("../utils/validators/authValidator");




// /api/auth/register
router.post("/register", signupValidator, registerUserCtrl);

// /api/auth/login
router.post("/login", loginValidator , loginUserCtrl);


module.exports = router;