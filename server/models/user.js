import mongoose, { Mongoose } from "mongoose";

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    }, 

    userName:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String, 
        required : true
    },

    role:{
        type: String, 
        enum: ["user" , "admin"],
        required : true
    },

    // in case If we want to do email varification 
    // email:{
    //     type: email, 
    //     required : true,
    //     unique: true
    // },

    files:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "files"
    }]
   
})


const users = mongoose.model( "users" , userSchema ); 

export default users; 