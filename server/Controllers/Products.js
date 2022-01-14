// import the model
const Products = require("../Models/Products");

// export the controller functionalities
exports.getProductDetails = (req, res) => {
    Products.find()
        .then((result) => {
            res.status(200).json({
                message: "Products fetched",
                products: result,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error in database",
                error: error,
            });
        });
};
