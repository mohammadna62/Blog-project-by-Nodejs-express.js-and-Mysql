const express = require("express");
const controller = require("./../controllers/articles");
const multer = require("multer");
const path = require("path")
const authGuard = require("./../middlewares/authGuard");
const { date } = require("yup");

const router = express.Router();
//! When use sharp package to compress file(picture cover) no need to config storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null , path.resolve(__dirname,"../public/images/covers"))
//   },
//   filename: (req, file, cb) => {
     
//     const filename = `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`
//     cb(null ,filename )
//   },
// });
// const fileFilter = (req , file ,cb) =>{
//    const validFileTypes = /jpeg|jpg|png/
//    const mimeType = validFileTypes.test(file.mimetype)
//    const extName = validFileTypes.test(path.extname(file.originalname))
//    if (mimeType && extName){
//    return cb(null ,true )
//    }else{
//     return  cb(new Error("File Type Is Not Valid !"))
//    }
// }
const uploader = multer({
   // storage, //! storage : storage  Note: When use sharp package to compress file(picture cover) no need to config storage
   // fileFilter,//! fileFilter:fileFilter
    limits:{fileSize:3*1024*1024} //#MB
})


router.route("/").get(controller.getAll).post(authGuard,uploader.single("cover"),controller.create);
router.route("/:slug").get(controller.getBySlug);
router.route("/remove/:id").post(controller.remove); //! use DELETE method for API base

module.exports = router;
