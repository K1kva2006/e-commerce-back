const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./public/products");
    },
    filename: (req, file, cb) => {
        return cb(null, req.userAuthData.userId + " " + file.originalname);
    },

});

const upload = multer({ storage });

/*
ქმნის მოწოდებულ ფოტოს public ფოლდერში. მომწოდებელის
jwt payload userId სახელს + ფოტოს ორიგინალი სახელით ანუ იმ სახელით 
შეიქმნება რა მისამართითაც მონაცემთა ბაზაში ინახება productImageUrl ი
*/

module.exports = upload;