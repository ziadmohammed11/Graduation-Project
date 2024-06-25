const router = require("express").Router();
const {postArticlesCtrl , getAllArticlesCtrl ,getArticlesCtrl, updateArticlesCtrl, deleteArticlesCtrl} = require("../controllers/articlesController")
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")
const uploadimage = require("../middlewares/uploadImageMiddleware")
// /api/auth/
router.get("/", getAllArticlesCtrl)
router.get("/:id",getArticlesCtrl)
router.post("/", verifyTokenAndAdmin,uploadimage.single("image"),postArticlesCtrl);
router.delete("/:id",verifyTokenAndAdmin, deleteArticlesCtrl)
router.put("/:id", verifyTokenAndAdmin,updateArticlesCtrl)


module.exports = router;
