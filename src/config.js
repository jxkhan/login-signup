const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://junaid:0078@atlascluster.vnsgpkh.mongodb.net/login-signup?retryWrites=true&w=majority&appName=AtlasCluster");

connect
  .then(() => {
    console.log("Database connected Successfully");
  })
  .catch(() => {
    console.log("Database cannot be connected");
  });

const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("user", loginSchema);
module.exports = collection;
