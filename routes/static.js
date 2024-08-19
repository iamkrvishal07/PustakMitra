const express= require("express")
const router = express.Router()
const Book=require("../models/schema")



router.get('/',async(req,res)=>{
    const book=await Book.find()
    res.render("home",{book})
})
router.get('/add/new',(req,res)=>{
    res.render("addbook",{book:new Book()});
})

router.get("/edit/:id",async(req,res)=>{
    const book=await Book.findById(req.params.id)
    res.render("editbook",{book});
})

module.exports=router