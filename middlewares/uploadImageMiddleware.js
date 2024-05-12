const multer = require('multer');
const path = require("path")
//const { v4: uuidv4 } = require('uuid');

// photo storge 
module.exports = multer({
  storage:multer.diskStorage({}),
})
/*const PhotoStorge = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, path.join(__dirname,"../uploads"))
  },
  filename: function(req,file,cb){
    if(file){
      cb(null, new Date().toISOString().replace(/:/g,"-") +  file.originalname)
    }else{
      cb(null,false);
    }
  }
})*/
// photo upload middlewares
/*const uploadPhoto = multer({
  storage: PhotoStorge,
  fileFilter: function(req,file,cb){
    if(file.mimetype.startsWith("image")){
      cb(null,true)
    }else{
      cb({message:"unsupported file format"},false)
    }
  },
  limits: {fieldSize: 1024 * 1024}
})

module.exports = uploadPhoto*/
/******************************************************************************************* */



 