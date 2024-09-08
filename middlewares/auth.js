const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authToken = req.headers["x-auth-token"];
    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decode) => {
        if (err) return res.status(401).json(err.message);
        req.userAuthData = decode;
        next();
    });
};
/*
აკეთებს იუსერის ვერიფიკაციას jwt authToken რომელიც ფრონტიდან მოდის და 
დიქოუდით ვიღებთ ფეილოუდიდან იუსერის id ს userId.. 
ამოწმებს ამ ტოკენს სეკრეტული კოდიდთაც 
*/
module.exports = auth;
