var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  _id: Number,
  title: String,
  product_type: String,
  quantity: Number,
  variant_id: Number,
  created_at: Date
});

module.exports = mongoose.model('Product', ProductSchema);
