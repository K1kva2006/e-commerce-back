const express = require("express");
const fs = require("fs");
const path = require("path");
const { User, Product } = require("../mongoose");
const route = express();

route.delete("/", async (req, res) => {
    try {
        const { productId } = req.body;

        const checkAdmin = await User.findOne({ _id: req.userAuthData.userId });
        if (!checkAdmin.isAdmin)
            return res.status(401).json("Error Your not a admin");

        const findProduct = await Product.findOne({ _id: productId });
        if (!findProduct) return res.status(400).json("Product not found");

        const imagePath = path.join(
            __dirname,
            `../public/products/${findProduct.productImageUrl}`
        );

       fs.unlink(imagePath, (err) => {
            if (err) {
                return res.status(400).json(err);
            }
        });

        const deleteProduct = await Product.deleteOne({ _id: productId });
        if (!deleteProduct) return res.status(400).json("Product not deleted");

        res.status(200).json("Successfully deleted product");
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route;
