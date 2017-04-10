var express = require('express'),
  exphbs = require('express-handlebars'),
  bodyParser = require('body-parser'),
  bcrypt = require('bcrypt'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection'),
  questionnare = require('./routes/questionnare'),
  answers = require('./routes/answers'),
  signup = require('./routes/signup'),
  record = require('./routes/record'),
  employees = require('./routes/employees');

var app = express();
var dbOptions = {
host: 'localhost',
user: 'root',
password: 'p@$$w0rd',
database: 'nmldb'
}

app.engine('handlebars', exphbs({
  defaultLayout: 'base'
}));

app.set('view engine', 'handlebars');
app.use(function(req, res, next) {
  next();
});


app.use(express.static(__dirname + '/public'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(bodyParser.urlencoded({
    extended: false
  }))
app.use(bodyParser.json())

app.get("/", function(req, res) {
  res.render("home");
});
app.get("/login",function(req, res, next) {
  res.render("login");
});
app.get("/signup",function(req, res, next) {
  res.render("signup");
});
app.get('/signup/addUser', signup.showSignup);
app.post('/signup/addUser', signup.add);
app.get('/employees', employees.show);
app.get('/questionnare', questionnare.display);
app.post('/questionnare/createQuestions', questionnare.createQuestions);
app.get('/answers', answers.show);
app.get('/record', record.display);
app.post('/answers/add', answers.add);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 3000;
//start everything up
app.listen(portNumber, function() {
  console.log('App running on:', portNumber);
});
