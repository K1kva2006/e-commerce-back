const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../mongoose");

const route = express.Router();

route.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });

        if (!findUser)
            return res.status(400).json("There is no user with this email");

        const checkUserPassword = await bcrypt.compare(
            password,
            findUser.passwordHash
        );

        if (!checkUserPassword)
            return res.status(400).json("Email or password is incorrect");

        const token = jwt.sign({userId: findUser._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h",
        });

        res.status(200).json({
            message: "You have successfully logged in",
            authToken: token
        });

    } catch (err) {
        res.status(400).json(err.message);
    }
});

/*

უნდა გადაეცეს მომხმარებლის მეილი და პაროლი

*/

module.exports = route;
