const { createCenter, updateCenter, getCenter, deleteCenter, getAllCenter } = require("../controllers/centerController")
const {verifyToken , verifyTokenAndAdmin } = require("../middlewares/verifyToken")
const router = require("express").Router()


router.post("/",verifyTokenAndAdmin,createCenter)
router.put("/:id",verifyTokenAndAdmin, updateCenter)
router.get("/:id",verifyToken, getCenter)
router.get("/", getAllCenter)
router.delete("/:id", verifyTokenAndAdmin,deleteCenter)




module.exports = router