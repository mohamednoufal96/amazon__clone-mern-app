// import the mongoose
const mongoose = require("mongoose");

// create a schema
const Schema = mongoose.Schema;

// declare fields present in the mongodb collection
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// create a model using the schema and connent to MongoDB and export the model
module.exports = mongoose.model("Users", UserSchema, "users");
