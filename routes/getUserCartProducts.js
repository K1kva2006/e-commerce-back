const express = require("express")
const route = express.Router()

const {User, Product} = require("../mongoose")

route.get("/", async(req,res) => {
    const { userId } = req.userAuthData
    const user = await User.findOne({_id: userId})
    const products = await Product.find({_id: user.productsCart})
    if(!products) res.status(400).json("Please Login again")
    res.status(200).json(products)
})

module.exports = route