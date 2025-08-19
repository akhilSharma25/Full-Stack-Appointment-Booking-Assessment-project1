import cookieParser  from "cookie-parser"
import dotenv  from "dotenv"
import express from "express"
import cors from "cors";

import userRoute from "./routes/userRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import connectDB from "./utils/db.js";

dotenv.config()


const app=express();

app.use(cors({
  origin: ["https://full-stack-appointment-booking-sexw.onrender.com","https://appointmentappasses.netlify.app"], 
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api", userRoute);
app.use("/api/detail", bookingRoute); 


const PORT=process.env.PORT || 3000

connectDB()

app.listen(PORT,()=>{
    console.log(`Server is Listening at ${PORT}`);
    
})
