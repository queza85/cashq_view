var express = require('express');
var app = express();
 
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/auth/redirect', function (req, res) {
  var qs = req._parsedUrl.query;
	console.log(qs);
console.log(process.env.NODE_ENV);
//  if (process.env.NODE_ENV === 'development') {
    res.redirect('exp://ge-cha.notbrent.app.exp.direct:80/+redirect/?' + qs);
//  } else {
//    res.redirect('exp://exp.host/@community/with-facebook-auth/+redirect/?' + qs);
//  }
});

app.get('/auth/facebook', function (req, res) {
  res.sendFile('facebook.html', {root: __dirname });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
 
  console.log('앱은 http://%s:%s 에서 작동 중입니다.', host, port);
});