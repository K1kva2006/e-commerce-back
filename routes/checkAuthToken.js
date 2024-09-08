const express = require("express");
const { User } = require("../mongoose");
const route = express();

route.get("/", async (req, res) => {
    try {
        const userOrAdmin = await User.findOne({ _id: req.userAuthData.userId });
        if (userOrAdmin.isAdmin) {
            return res.status(200).json(userOrAdmin);
        }
        res.status(200).json(userOrAdmin);
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route;
