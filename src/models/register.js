const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcryptjs");

const registerSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: [true, "email already exists"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email ")
            };
        }},
        password: {
            type: String,
            required: true
        },
        role:String
    })
    registerSchema.pre('save',async function(next){
        if(this.isModified('password')){
           this.password=await bcrypt.hash(this.password,12);
        }
        next();
     })

const Register = new mongoose.model("Register", registerSchema);
module.exports = Register;