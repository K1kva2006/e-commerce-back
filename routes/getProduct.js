const express = require("express");
const route = express.Router();
const {Product} = require("../mongoose")

route.post("/", async (req, res) => {
    try {
        const { productId } = req.body;
        console.log(productId)
        const resProduct = await Product.findOne({_id: productId})
        if(!resProduct) return res.status(400).json("Product not found")
        res.status(200).json(resProduct)
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route;
