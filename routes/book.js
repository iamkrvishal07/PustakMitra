const express= require("express")
const router = express.Router()
const {getbook,addbook,upload,deletebook,updatebook} = require("../controllers/book.js")


router.get('/:id',getbook);
router.post('/',upload.single('image'),addbook);
router.delete("/:id", deletebook);
router.patch("/:id",upload.single('image'), updatebook);



module.exports=router;

