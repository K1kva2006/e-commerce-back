const express = require("express");
const route = express.Router();

const { User } = require("../mongoose");

route.delete("/", async (req, res) => {
    try {
        const findUserAndDeleteCartProduct = await User.findOneAndUpdate(
            { _id: req.userAuthData.userId },
            {
                $pull: { productsCart: req.body.productId },
            }
        );
        if (!findUserAndDeleteCartProduct)
            return res.status(400).json("Please try again later");
        res.status(200).json(
            "The product has been successfully removed from the cart"
        );
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route;
