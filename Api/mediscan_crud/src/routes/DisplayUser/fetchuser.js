const express = require('express')
const cors = require('cors')
const User = require('../../Models/User.js')


const router = express.Router()

router.use(express.json())
router.use(cors())


router.get("/employee/:id",async(req,res)=>{
    const id = req.params.id.trim();

    try{

        const fetchUser = await User.findOne({ _id:id})

        if(!fetchUser){
            console.log("User Not found")
            return res.status(201).json({success:false, message:"User not found"})
        }

        console.log("User found",fetchUser)
        return res.status(200).json({success:true,message:"User Found!",user:fetchUser})
        

    }catch(error){
        console.error("Error",error)
        return res.status(500).json({success:false, message:"Server Error"})
    }
})

module.exports = router;