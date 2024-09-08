const express = require("express");
const route = express.Router();

const { User, Product } = require("../mongoose");

route.post("/", async (req, res) => {
    try {
        await User.findOneAndUpdate(
            { _id: req.userAuthData.userId },
            { $push: { productsCart: req.body.productId } }
        );
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route;
