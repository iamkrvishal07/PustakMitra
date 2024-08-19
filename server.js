const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/connectionDB");
const methodOverride = require('method-override');

// Connect to the database
connectDB();

app.set("view engine", "ejs");

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Method Override middleware
app.use(methodOverride('_method'));

// Static files middleware
app.use(express.static("public"));

// Routes
app.use("/book", require("./routes/book"));
app.use("/", require("./routes/static"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
