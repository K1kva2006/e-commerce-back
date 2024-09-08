const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minLength: [4, "Name is too short"],
        maxLength: [20, "Name is too long"],
    },
    email: {
        type: String,
        required: [true, "Please provide email address"],
        unique: true,
        minLength: [6, "Email is too short"],
        maxLength: [36, "Email is too long"],
        validate: {
            validator: async function (reqEmail) {
                const checkEmail = await this.constructor.findOne({
                    email: reqEmail,
                });
                return !checkEmail;
            },
            message: "Email address already in use",
        },
    },
    phone: {
        type: String,
        required: [true, "Please provide phone"],
        minLength: [9, "phone number is too short"],
        maxLength: [20, "phone number is too long"],
    },
    passwordHash: {
        type: String,
        required: [true, "Please provide Password"],
    },
    productsCart: [
        {
            type: mongoose.Schema.ObjectId,
        },
    ],

    isAdmin: {
        type: Boolean,
    },
});
const User = mongoose.model("User", UserSchema);

const ProductSchema = mongoose.Schema({
    productBrand: {
        type: String,
        required: [true, "Please provide product brand"],
        minLength: [2, "Name is too short"],
        maxLength: [50, "Name is too long"],
    },
    productName: {
        type: String,
        required: [true, "Please provide product name"],
        minLength: [4, "Name is too short"],
        maxLength: [50, "Name is too long"],
    },
    productColor: {
        type: String,
        required: [true, "Please provide product color"],
    },
    productPrice: {
        type: Number,
        required: [true, "Please provide product price"],
        min: [1, "Price is too low "],
        max: [1000, "Price is too high"],
    },
    productImageUrl: {
        type: String,
        required: [true, "Please provide product image"],
    },
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = {
    User,
    Product,
};
