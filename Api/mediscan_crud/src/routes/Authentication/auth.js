const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require('../../Models/User.js');
require('dotenv').config();

const router= express.Router();

const SECRET_KEY = process.env.SECRET_KEY

router.use(express.json());
router.use(cors());


//Sign Up
router.post('/signup', async (req, res) => {
  try {
    const formData = req.body;

    const hashPassword = await bcrypt.hash(formData.password,10)

    const newUser = new User({...formData, password:hashPassword});
    await newUser.save();
    
    res.status(200).json({ message: "User registered successfully!" });
    console.log("Register Successfully")
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

//Sign In
router.post("/signin", async(req,res)=>{
    try{
        const { email, password} = req.body
        
        if(!email || !password){
            return res.status(400).json({success: false, message:"Email and Password are required"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({success:false, message:"Invalid Email or Password"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(401).json({success:false, message:"Invalid Email or Password"})
        }

        const token = jwt.sign({
            user_id:user._id,
            email:user.email,
            role:user.role,
            hospitalId:user.hospitalId
        },
        SECRET_KEY,{expiresIn: '1h'}
        );

        const userData = {
            id: user._id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            department: user.department,
            hospitalId: user.hospitalId,
            licenseNumber: user.licenseNumber,
            gender: user.gender
        };

        res.status(200).json({
            success:true,
            message:"Login Successfull",
            user:userData,
            token:token
        });

        console.log("Login Successfull",email)
    }catch(error){
        res.status(500).json({message:"Unexpected Error"})
        console.error("Error",error)
    }
});

module.exports = router;