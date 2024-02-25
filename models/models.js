const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userScheme = new Schema(
  {
    name: String,
    // quantity: Array,
    order: Array
  },
  { versionKey: false }
);

module.exports.User = mongoose.model('user', userScheme);


const menuScheme = new Schema(
  {
    name: String,
    cost: Number,
    measure: String,
    image: String,
  },
  { versionKey: false }
);

module.exports.Menu = mongoose.model('menu', menuScheme);
