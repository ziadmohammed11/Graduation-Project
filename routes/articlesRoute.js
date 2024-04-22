const router = require("express").Router();
const {postArticlesCtrl , getAllArticlesCtrl ,getArticlesCtrl, updateArticlesCtrl, deleteArticlesCtrl} = require("../controllers/articlesController")
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")
// /api/auth/
router.get("/",verifyTokenAndAdmin, getAllArticlesCtrl)
router.get("/:id",getArticlesCtrl)
router.post("/", verifyTokenAndAdmin,postArticlesCtrl);
router.delete("/:id",verifyTokenAndAdmin, deleteArticlesCtrl)
router.put("/:id", verifyTokenAndAdmin,updateArticlesCtrl)


module.exports = router;
