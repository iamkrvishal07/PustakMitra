const { default: mongoose } = require("mongoose");

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        //required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        //required: true,
    }    
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
