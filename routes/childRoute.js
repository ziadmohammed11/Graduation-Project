const { createChild, getAllChild, getChild } = require("../controllers/childController");

const router = require("express").Router();


router.post("/", createChild)
router.get("/", getAllChild)
router.get("/:id", getChild);



module.exports= router;