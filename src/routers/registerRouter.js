const express = require("express");
const router = new express.Router();
const Register = require("../models/register");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await Register.findOne({ email })

        if (!email || !password) {
            res.json({message:"Please fill all the fields"});
        }

        else if (userExist) {
            res.status(401).json({status: false,
                message:"email already exists"});
        }
        else {

            const user = new Register({email,password,role:"user"});
            const createUser = await user.save();
            console.log(createUser)
            res.status(200).json({createUser,status:true,message:"User added successfully"})
        }
    }
    catch (e) {
        res.json(e)
    }

})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Register.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.status(200).json({email:user.email,role:user.role,message:"loggedin successfully",status:true})
            }
            else {
                res.json({message:"email & password does not match",status:false})
            }
        }else{
            res.status(401).json({message:"email does not exist"})
        }

    } catch (e) {
        console.log(e)
    }
})
module.exports = router;