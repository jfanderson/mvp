var express = require('express');
var productCtrl = require('./productController');

var router = express.Router();

router.get('/', productCtrl.getProducts);

module.exports = router;
