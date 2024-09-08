require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// middlewares
const auth = require("./middlewares/auth");
const upload = require("./middlewares/upload");

// routes modules
const register = require("./routes/register");
const login = require("./routes/login");
const checkAuthToken = require("./routes/checkAuthToken");
const addProductData = require("./routes/addProductData");
const addProductImage = require("./routes/addProductImage");
const getAllProducts = require("./routes/getAllProducts");
const addProductInCart = require("./routes/addProductInCart");
const getCartProducts = require("./routes/getCartProducts");
const getUserCartProducts = require("./routes/getUserCartProducts");
const deleteCartProduct = require("./routes/deleteCartProduct");
const getProduct = require("./routes/getProduct");
const getProductsBrand = require("./routes/getProductsBrand");
const deleteProduct = require("./routes/deleteProduct");
const addAdmin = require("./routes/addAdmin");

mongoose
    .connect(process.env.MONGO_CONNECTION_URL)
    .then(() => console.log("Successfully Connected To MongoDB"))
    .catch((err) => console.log(err));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));

// routes
app.use("/register", register);
app.use("/login", login);
app.use("/check/auth/token", [auth, checkAuthToken]);
app.use("/add/product/data", [auth, addProductData]);
app.use("/add/product/image", [auth, upload.single("file"), addProductImage]);
app.use("/get/all/products", getAllProducts);
app.use("/add/product/cart", [auth, addProductInCart]);
app.use("/get/cart/products", [auth, getCartProducts]);
app.use("/get/user/cart/products", [auth, getUserCartProducts]);
app.use("/delete/cart/product", [auth, deleteCartProduct]);
app.use("/get/product", getProduct);
app.use("/get/products/brand", getProductsBrand);
app.use("/delete/product", [auth, deleteProduct]);
app.use("/add/admin", [auth, addAdmin]);

app.listen(process.env.PORT, () =>
    console.log("Server Is Running On Port " + process.env.PORT)
);
