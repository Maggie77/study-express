var express = require('express');
var router = express.Router();

// middleware that is specific to this router
var requestTime = function(req,res,next){
  req.requestTime = Date.now();
  console.log('Time: ', Date.now());
  next();
}
router.use(requestTime);
// define the home page route
router.get('/', function(req, res) {
  var responseText = 'Birds home page'+ req.requestTime;
  res.send(responseText);
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
