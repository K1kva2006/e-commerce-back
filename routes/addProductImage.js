const express = require("express");
const { User } = require("../mongoose");
const route = express.Router();

route.post("/", async (req, res) => {
    try {
        const checkIsAdmin = await User.findOne({
            _id: req.userAuthData.userId,
        });
        if (!checkIsAdmin.isAdmin)
            return res.status(400).json("You are not admin");
        if (!req.file) return res.status(400).json("Product image required");
        res.status(200).json("Product image added successfully");
    } catch (err) {
        res.status(400).json(err);
    }
});
/*
უნდა გადაეცეს პროდუქტის ფოტო რადგან შექმნას ის product/productsimages ფოლდერში
*/
module.exports = route;
