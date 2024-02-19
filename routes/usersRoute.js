const router = require("express").Router();
const { getAllUsers , getUser , getUserAndUpdate , getUserAndDelete } = require("../controllers/userController");


router.get("/getusers" , getAllUsers)

router.get("/:id" , getUser)
router.put("/:id" , getUserAndUpdate)
router.delete("/:id" , getUserAndDelete)




module.exports = router;
