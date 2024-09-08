const express = require("express");
const route = express();

const { Product } = require("../mongoose");

route.post("/", async (req, res) => {
    try {
        const { brand } = req.body;
        const products = await Product.find({ productBrand: brand });
        if (!products) return res.status(400).json("Products not found");
        res.status(200).json(products);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route
