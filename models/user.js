"use strict";
const mongoose = require("mongoose");
const user = mongoose.Schema({
    firstName: { type: String, required: true, trim: true, },
    lastName: { type: String, unique: false, required: true, trim: true, },// set false unique if unique va;ue is not required
    // username: { type: String, unique: true, required: true },// set false unique if unique value is not required
    email: { type: String, required: true, trim: true, },
    phoneNumber: { type: String, default: "" },
    password: { type: String, required: true },
    sex: { type: String, default: "" },
    token: { type: String, default: "" },//access token
    status: {
        type: String, default: "active",
        enum: ["active", "inactive"]
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image',
    },
    /* correct method for saving coordinates in mongodb */
    // loc: {
    //     type: { type: String, default: "Point" , required: true,},
    //     coordinates: [Number]
    // },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true
    },
    deviceToken: { type: String, default: "" },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date, default: Date.now },
});
// user.index({ "loc": "2dsphere" });
mongoose.model("user", user);
module.exports = user;