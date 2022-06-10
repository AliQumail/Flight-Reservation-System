const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
  adminId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const model = mongoose.model("adminData",  Admin);

module.exports = model;
