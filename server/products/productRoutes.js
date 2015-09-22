var express = require('express');
var productCtrl = require('./productController.js');

var router = express.Router();

router.get('/', productCtrl.getProducts);

module.exports = router;
