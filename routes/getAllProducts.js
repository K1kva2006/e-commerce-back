const express = require("express");
const path = require("path");
const { Product } = require("../mongoose");

const route = express.Router();

route.get("/", async (req, res) => {
    try {
        const allProducts = await Product.find({});
        res.status(200).json(allProducts)
    } catch (err) {
        res.status(400).json(err.message);
    }
});

/*
როცა ყველა ობიექტი წავა შემდგომ თითოეულ ობიექტიდან გაიგზავნება რექუესთი 
მთავარ რაუთზე / და სახელი გადაეცემა productImageUrl და შემდგომ src ში ჩაჯდება 
*/

module.exports = route;
