var express = require('express');
var router = express.Router();
var conf = require('./../conf')();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('edit',{'conf':conf});
});

module.exports = router;
