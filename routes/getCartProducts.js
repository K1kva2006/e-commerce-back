const express = require("express");
const route = express.Router();
const { User } = require("../mongoose");

route.get("/", async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.userAuthData.userId });
        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err.message);
    }
});

module.exports = route;
