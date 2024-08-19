const Book = require("../models/schema");
const multer= require("multer")
const path =require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("./public/uploads"));
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.originalname
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })



const getbook = async(req, res) => {
    const book=await Book.findById(req.params.id)
    res.render("bookdetails",{book})
};

const addbook = async (req, res) => {
    console.log(req.file); // Debugging line
    const { title, price, description, image, author } = req.body;

    // Validate required fields
    if (!title || !price || !author) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        // Check if the book already exists
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            //return res.status(400).json({ message: "Book already exists" });
            return res.render("addbook",{error:"Book already exist"})
        }

        // Create a new book
        const newBook = await Book.create({ title, price, description, image:`/uploads/${req.file.filename}`, author });
        res.redirect("/")
        //res.status(201).json(newBook);

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
        
    }
};
const deletebook = async (req, res) => {
    try {
        await Book.deleteOne({ _id: req.params.id });
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting the book");
    }
};

const updatebook = async (req, res) => {
    try {
        // Update the book with the data from the request body, including the new image path
        await Book.findByIdAndUpdate(req.params.id, {
            ...req.body,
            image: `/uploads/${req.file.filename}`,
        }, { new: true });

        // Redirect to the home page after successful update
        res.redirect("/");
    } catch (err) {
        console.error("Error updating the book:", err);
        res.status(500).send("Error updating the book");
    }
};




module.exports = { getbook, addbook,upload,deletebook,updatebook };
