"use strict";
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userRole: { type: String, required: true, trim: true },
        userName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        createdOn: { type: Date, default: Date.now },
        updatedOn: { type: Date, default: Date.now },
    }
);
mongoose.model("newuser", userSchema)//mongoose.model("model name you want",schema name)
module.exports = userSchema;