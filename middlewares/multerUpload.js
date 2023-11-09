import multer from "multer";
import User from "../models/User.js";
var storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'public/images/' , function(){
        if (error)
        throw error;
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname,function(error1,success){
        if(error1)
        throw error1;
    });
   
  },
});


const fileFilter = async function  (req, file, cb) {
  
  // console.log(req.userId,"in upload");
  console.log("this is file" ,file);

  const userData = await User.findById(req.userId);
  if(!userData)
  {
    cb(new Error('User doesnot exists anymore'))
      
  }
  else{
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
      }else{
        cb(new Error('only images are allowed'))
      }
  }
};


var upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single('image');


export default upload ;
