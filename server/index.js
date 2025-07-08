// entry point to the server side 

import express from "express"; 
import '@dotenvx/dotenvx/config'; 
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js"
import cookieParser from "cookie-parser" 


const app = express(); 
const PORT = process.env.PORT || 8000; 


// some middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// routing 
app.use("/user", userRoute);
// app.use("/admin", adminRoute);

app.listen( PORT, (req ,res) =>{
    console.log( `App is running at PORT : ${PORT}`); 
    connectDB(); 
})