var express = require('express')
var session = require('cookie-session')

var app = express()

app.use(session({
  secret: 'keyboard cat', 
  key: 'sid', 
  cookie: { secure: false }
}));

app.use(function (req, res, next) {
  var n = req.session.views || 0
  req.session.views = ++n
  res.end(n + ' views')
})

app.listen(3000);

