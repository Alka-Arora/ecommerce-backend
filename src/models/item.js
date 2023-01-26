const mongoose = require("mongoose");

const itemSchema=new mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    description:String,
    categoryId:String
})

const Item=new mongoose.model("Item",itemSchema);
module.exports=Item;