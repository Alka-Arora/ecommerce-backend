const mongoose = require("mongoose");

const cartSchema=new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    categoryId:String,
    itemId:String,
    quantity:Number
})

const Cart=new mongoose.model("Cart",cartSchema);
module.exports=Cart;