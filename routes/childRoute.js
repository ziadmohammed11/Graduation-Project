const { createChild, getAllChild, getChild, deleteAllChild } = require("../controllers/childController");

const router = require("express").Router();


router.post("/", createChild)
router.get("/", getAllChild)
router.get("/:id", getChild);
router.delete("/", deleteAllChild);



module.exports= router;