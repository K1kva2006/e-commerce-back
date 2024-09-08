const express = require("express")
const route = express()
const {User} = require("../mongoose")

route.post("/", async(req,res) => {
    try {
        const checkAdmin = await User.findOne({_id:  req.userAuthData.userId})
        if(!checkAdmin.isAdmin) return res.status(401).json("You are not admin !")
        const { userEmail } = req.body
        const checkAndUpdateUserToAdmin = await User.findOneAndUpdate({email: userEmail}, {isAdmin: true})
        if(!checkAndUpdateUserToAdmin) return res.status(400).json("The user was not found by this email")
        res.status(201).json("The user has successfully become an admin")
    } catch(err)  {
        res.status(400).json(err.message)
    }
   
})

module.exports = route