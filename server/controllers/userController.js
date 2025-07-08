import users from "../models/user.js";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 


// Register Controller 
export const signup = async ( req, res) =>{
   try{
        const { fullName , userName, password, role } = req.body; 

        // check if every infomation is present or NOT 
        if( !fullName || !userName || !password || !role ){
            return res.status(400).json({
                message:"Some information is missing", 
                success: false
            })
        }

        // now Hashing the password 
        const hashedPassword = await bcrypt.hash( password , 10);

        const newUser = new users({ fullName, userName, password:hashedPassword, role }); 

        await newUser.save(); 
        return res.status(200).send( newUser ); 


    } 
   catch (error) {
        if (error.code === 11000) { //  to check duplicate key error
            return res.status(409).json({ error: "UserName already exists" });
        }

        console.log(error);     
   } 
}

// Login Controller 
export const login = async ( req, res ) =>{
    try {
       const { userName , password , role } = req.body; 
       
       // checking if all the information is present or not 
       if( !userName || !password || !role ){
            return res.status(400).json({
                message:"Some information is missing ", 
                success: false
            })
        }
        
        // checking if the user exists or NOT 
        const user = await users.findOne({userName}); 
        if( !user ){
           return res.status(400).json({
                message:" UserName does not exists", 
                success: false
            })    
        }

        if( user.role != role ){
            return res.status(400).json({
                message:"Incorrect role", 
                success: false
            })
        }
        
        // checking if the password is correct or not 
        const correctPassword = await bcrypt.compare( password , user.password);
        // console.log( correctPassword);  
        
        if( !correctPassword ){
            return res.status(400).json({
                message:" Incorrect Username or Password", 
                success: false
            })     
        }

        // now if everything is correct then store the username in token 
        const tokenData = {userName:userName}; 
        const token = jwt.sign( tokenData, process.env.SECRET_KEY, {expiresIn :'1d'} ); 


        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000 , httpsOnly:true , sameSite:'strict'}).json({
            message:`welcome back ${user.userName}`, 
            success:true
        })
    } 
    catch (error) {
       console.log(error);
    }
}

// Logout Controller 
export const logout = (req , res ) =>{
    try {
        // we will just empty the browser token 
        return res.status(201).cookie("token", "" ,  {maxAge : 0 } ).json({
            message:"Logged out successfully", 
            success:true,
        })
    } catch (error) {
        console.log(error); 
    }
}