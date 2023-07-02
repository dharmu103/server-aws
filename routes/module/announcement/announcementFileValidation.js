const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/announcement');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    },
  });
  
  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if ( file.mimetype  ===  'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/pdf') {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .xlsx .xls format allowed!"));
      }
    },
  });

  module.exports.announcementUpload = upload.single("photofile")