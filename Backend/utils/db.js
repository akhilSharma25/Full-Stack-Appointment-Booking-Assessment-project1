import mongoose from "mongoose";

const connectDB=async()=>{
    try {
      await  mongoose.connect(process.env.DB_URL)
        console.log("DB connect Successfully");
        
    } catch (error) {
        console.log("Database connection error" ,error);
        
    }
}

export default connectDB