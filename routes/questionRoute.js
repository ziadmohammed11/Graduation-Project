const router = require("express").Router();
const {postquestionCtrl} = require("../controllers/questionControllers")


// /api/auth/register
router.post("/post", postquestionCtrl);


module.exports = router;
