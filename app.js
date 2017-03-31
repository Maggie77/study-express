var express = require('express')
var app = express()
var hostname = '127.0.0.1'

var server = app.listen(3000,hostname,()=>{
  let host = server.address().address;
  let port = server.address().port;
  console.log('listening at http://%s:%s',host,port)
})

var cb0 = function (req, res, next) {
  console.log('CB0',req.originalUrl);
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1',req.method);
  console.log('params:',req.params.id);
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});

app.use('/maggie',express.static('static'));

app.route('/love/:id/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

var aaa = require('./static/aaa');
var cb = function(req,res,next){
  if(req.params.id == 0) next('route')  else next();
};

app.use('/love/:id',[cb,cb0,cb1],aaa);
