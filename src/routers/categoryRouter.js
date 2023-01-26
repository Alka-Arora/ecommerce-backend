const express=require("express");
const router= new express.Router();
const Category=require("../models/category");

router.post("/category",async(req,res)=>{
    const category=await new Category(req.body);
    const createCategory=await category.save();
    res.json({createCategory,status:true,message:"category added successfully"})
})

router.get("/category",async(req,res)=>{
    const category=await Category.find()
    res.json(category)
})

module.exports=router;