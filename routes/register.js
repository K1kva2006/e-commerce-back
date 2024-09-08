const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../mongoose");

const route = express.Router();

route.post("/", async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        const newUser = await User.create({
            name,
            email,
            phone,
            passwordHash: await bcrypt.hash(password, 10),
        });
        if (newUser) {
            return res.status(201).json("Account Created Successfully");
        }
    } catch (err) {
        res.status(400).json(err.message);
    }
});

/*
უნდა გადაეცეს name, email, phone, password
*/

module.exports = route;
