const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String },
  contact: {type : Number},
  message: { type: String }
});

module.exports = mongoose.model("Form", formSchema);
