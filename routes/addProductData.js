const express = require("express");
const { User, Product } = require("../mongoose");

const route = express.Router();

route.post("/", async (req, res) => {
    try {
        const { productBrand,productName, productColor, productPrice, productImageUrl } =
            req.body;

        const checkIsAdmin = await User.findOne({
            _id: req.userAuthData.userId,
        });
        if (!checkIsAdmin.isAdmin)
            return res.status(400).json("You are not admin");

         await Product.create({
            productBrand,
            productName,
            productColor,
            productPrice,
            productImageUrl: req.userAuthData.userId + " " + productImageUrl,
        });

        res.status(200).json("Product data added successfully");
    } catch (err) {
        res.status(400).json(err.message);
    }
});

/*
უნდა გადაეცეს სახელი, ფერი, ფასი, პროდუქტის სახელი " levani.png ", პროდუქტის მფლობელის აიდი " jwt payload userId "
*/

module.exports = route;
