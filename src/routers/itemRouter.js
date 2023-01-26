const express = require("express");
const router = new express.Router();
const Item = require("../models/item");
const Category = require("../models/category");

router.post("/items", async (req, res) => {
    try {
        const { name, price, category, description } = req.body;
        if (!name || !price || !category || !description) {
            res.json({ message: "Please fill all the fields" });

        } else {
            const { name, price, category, description } = req.body;
            const itemCategory = await Category.findOne({ name: category })
            const addItem = await new Item({ name, price, category, description, categoryId: itemCategory._id });
            const createItem = await addItem.save();

            res.status(200).json({ createItem, status: true, message: "Item added successfully" })
        }

    } catch (e) {
        res.json(e)
    }
})

router.get("/items", async (req, res) => {
    const data = await Item.find();
    res.json(data)
})

router.get("/items/:categoryId", async (req, res) => {
    const { categoryId } = req.params
    try {
        let items;
        if (categoryId === "all") {
            items = await Item.find()
        } else {
            const categoryExist = await Category.findOne({ _id: categoryId })
            if (categoryExist) {
                items = await Item.find({ categoryId })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Category Not exists"
                })
            }
        }
        res.json(items)
    }
    catch (err) {
        res.json(err)
    }
})
router.put("/items", async (req, res) => {
    try {
        const { _id } = req.body
        const item = await Item.findByIdAndUpdate({ _id }, req.body)
        if (item) {

            res.json({ success: true, message: "Updated successfully" })
        }
        else {
            res.status(400).json({ success: false, message: "item not found" })
        }
    } catch (err) {
        res.json(err)
    }


})

router.delete("/items", async (req, res) => {
    try {
        const { _id } = req.body
        const item = await Item.findByIdAndDelete({ _id })
        if (item) {
            res.json({ success: true, message: "deleted successfully" })
        } else {
            res.status(400).json({ success: false, message: "item not found" })
        }
    } catch (err) {
        res.json(err)
    }

})

module.exports = router;