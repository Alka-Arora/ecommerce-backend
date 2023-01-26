const express = require("express");
const router = new express.Router();
const Item = require("../models/item");
const Cart = require("../models/cart");

router.post("/cart",async(req,res)=>{
    try{
        const {id}=req.body;
        const item=await Item.findOne({_id:id})
        if(item){
            const cartItem=await new Cart({name:item.name,price:item.price,category:item.category,description:item.description,categoryId:item.categoryId,itemId:item._id,quantity:1})
            const addCart=await cartItem.save();
            res.json({addCart,success:true,message:"Added to cart successfully"})
        }else{
            res.status(400).json({success:false,message:"No item found"})
        }
    }catch(err){
        res.json(err)
    }
    
   
})

router.get("/cart",async(req,res)=>{
    const cartItem=await Cart.find();
    res.status(200).json(cartItem)
})


router.put("/cart",async(req,res)=>{
    try{
        const{id,quantity}=req.body
        const item=await Cart.findOneAndUpdate({_id:id},req.body,{
            new:true
        })
        if(item){
            res.json({success:true,item})

        }else{
            res.status(401).json({success:false,message:"No item found"})
        }
    }catch(err){
        res.json(err)
    }
   
})

router.delete("/cart",async(req,res)=>{
    try{
        const{id}=req.body
        const item=await Cart.findOneAndDelete({_id:id})
        if(item){
            res.json({success:true,message:"deleted successfully"})

        }else{
            res.status(401).json({success:false,message:"No item found"})
        }
    }catch(err){
        res.json(err)
    }
})

module.exports=router                                    