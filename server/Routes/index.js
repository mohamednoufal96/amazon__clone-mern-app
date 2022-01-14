//require router from the express library
const express = require("express");
const router = express.Router();

// import the controllers
const productsController = require("../Controllers/Products");
const userController = require("../Controllers/Users");
const paymentsController = require("../Controllers/Payments");

// declare the routes and bind it with controller functionalities
router.get("/getProductDetails", productsController.getProductDetails);
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.post("/payment", paymentsController.payment);
router.post("/paymentCallback", paymentsController.paymentCallback);

// export the routes
module.exports = router;
