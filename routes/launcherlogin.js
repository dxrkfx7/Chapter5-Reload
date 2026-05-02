const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");

const User = require("../model/user.js");

app.get("/login/:email/:password", async (req, res) => {
let user = await User.findOne({ email: req.params.email.toLowerCase(), banned: false }).lean();
if (!user) {
    console.log("no acc");
    return res.status(404).end();
}
const result = await bcrypt.compare(req.params.password, user.password);
if (!result) {
    console.log("no pw");
    return res.status(404).end();
}
console.log("account exists");
res.status(200).end();
});

module.exports = app;