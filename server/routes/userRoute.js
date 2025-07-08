// here , routes related to the user will be created 

import express from "express";
import { login, logout, signup } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router(); 


// Sign-up Route  
router.route("/register").post(signup); 

// Login Route 
router.route("/login").post(login); 

// Log-Out Route 
router.route("/logout").post(logout); 

export default router