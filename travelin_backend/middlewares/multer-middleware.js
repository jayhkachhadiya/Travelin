import multer from "multer";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');  // Set the destination folder for uploaded files
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
//     }
// });

// const upload = multer({ storage: storage });

// const upload = multer({
//     storage: multer.memoryStorage({
//         destination: function (req, file, cb) {
//             cb(null, "uploads")
//         },
//         filename: function (req, file, cb) {
//             // cb(null, file.fieldname + "-" + Date.now() + ".JPG")
//             cb(null, file.originalname)
//         }
//     })
// }).single("image")


const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).any("image");

export default upload 