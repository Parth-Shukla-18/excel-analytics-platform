import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    fileName:{
        type: String,
        required: true,
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users"
    },
    
    Xaxis: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },

    Yaxis: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
    
})

const files = mongoose.model("files", fileSchema); 


export default files ; 