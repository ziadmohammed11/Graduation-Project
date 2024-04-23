const router = require("express").Router();
const { getAllUsers , getUser , getUserAndUpdate , getUserAndDelete , profilePohtoUpload } = require("../controllers/userController");
const uploadPhoto = require("../middlewares/uploadImageMiddleware");
const {verifyToken} = require("../middlewares/verifyToken")


router.get("/getusers" , getAllUsers)

router.get("/:id" , getUser)
router.put("/:id" ,verifyToken,getUserAndUpdate)
router.delete("/:id" , getUserAndDelete)
router.post("/uploadprofile" , verifyToken , uploadPhoto.single("image") , profilePohtoUpload)




module.exports = router;
