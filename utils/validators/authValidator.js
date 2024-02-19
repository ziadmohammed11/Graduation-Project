const { check } = require("express-validator")
const validatorMiddleware = require("../../middlewares/validatorMiddleware")
const { User } = require("../../model/Users")

exports.signupValidator = [
    check('username')
      .notEmpty()
      .withMessage('User required')
      .isLength({ min: 3 })
      .withMessage('Too short User name')
    ,
    check('email')
      .notEmpty()
      .withMessage('Email required')
      .isEmail()
      .withMessage('Invalid email address')
      .custom((val) =>
        User.findOne({ email: val }).then((user) => {
          if (user) {
            return Promise.reject(new Error('E-mail already in user'));
          }
        })
      ),
  
    check('password')
      .notEmpty()
      .withMessage('Password required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters')
      /*.custom((password, { req }) => {
        if (password !== req.body.passwordConfirm) {
          throw new Error('Password Confirmation incorrect');
        }
        return true;
      })*/,
    validatorMiddleware,
];

exports.loginValidator = [
    check('email')
      .notEmpty()
      .withMessage('Email required')
      .isEmail()
      .withMessage('Invalid email address'),
  
    check('password')
      .notEmpty()
      .withMessage('Password required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  
    validatorMiddleware,
];