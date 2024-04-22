const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

//const ApiError = require('../utils/apiError');




//DiskStorage engine
const multerStorage = multer.diskStorage({
  destination: function(req ,file ,cb){
    cb(null,'uploads/question');
  },
  filename:function(req,file,cb){
    const ext = file.mimetype.split('/')[1];
    const filename = `quesetion-${uuidv4()}-${Data.now()}.${ext}`;
    cb(null, filename)
  },
})

const upload = multer({storage:multerStorage})

exports.uploadimage = upload.single("image")


/*const multerOptions = () => {

  const multerStorage = multer.memoryStorage();

  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb(new ApiError('Only Images allowed', 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);*/