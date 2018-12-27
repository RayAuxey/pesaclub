const mongoose = require("mongoose");
const Mixed = mongoose.SchemaTypes.Mixed;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: { type: String, required: true },
  pesaforms: { type: Mixed, default: [] }
});

module.exports = mongoose.model("User", userSchema);
