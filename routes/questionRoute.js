const router = require("express").Router();
const {postquestionCtrl , getAllQuestionCtrl ,getQuestionCtrl, updateQuestionCtrl, deleteQuestionCtrl} = require("../controllers/questionControllers")
const {verifyToken , verifyTokenAndAdmin } = require("../middlewares/verifyToken")
const uploadimage = require("../middlewares/uploadImageMiddleware")


// /api/auth/questions
router.get("/", getAllQuestionCtrl)
router.get("/:id",getQuestionCtrl)

router.put("/:id", verifyTokenAndAdmin,updateQuestionCtrl)
router.post("/",verifyTokenAndAdmin, uploadimage.single("image") , postquestionCtrl);
router.delete("/:id",verifyTokenAndAdmin, deleteQuestionCtrl)


module.exports = router;
