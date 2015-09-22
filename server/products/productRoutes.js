var express = require('express');
var productCtrl = require('./productController.js');

var router = express.Router();

router.route('/')
  .get(productCtrl.getProducts)
  .put(productCtrl.updateInventory);

module.exports = router;
