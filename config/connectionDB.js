const mongoose=require("mongoose")
const connectDB=async(req,res)=>{
    await mongoose.connect(process.env.str)
    .then(()=>console.log("Database is connected"))
    .catch(()=>process.exit(1))
}

module.exports=connectDB