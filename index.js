var express = require('express'),
  exphbs = require('express-handlebars'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection'),
  questionnare = require('./routes/questionnare'),
  answers = require('./routes/answers'),
  signup = require('./routes/signup'),
  flash = require('express-flash'),
  record = require('./routes/record'),
  middleware = require('./middlewares/server'),
  sendMail = require('./routes/sendMail'),
  login = require('./routes/login'),
  cookieParser = require('cookie-parser')
  hbs = require('nodemailer-express-handlebars');

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
app.use(express.static(__dirname + '/public'));
app.use(flash());

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30 // expire after 30 minutes
  }
}));
// app.use(function(req, res, next) {
//   res.locals.currentUser = req.session.employee_id;
//    console.log(res.locals.currentUser);
//   next();
// });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
  }))
  // parse application/json
app.use(bodyParser.json());

app.get("/signup", middleware.loggedOut, function(req, res, next) {
  res.render("signup");
});
app.get("/login", middleware.loggedOut, function(req, res) {
  res.render("login", {
    showNavBar: false
  });
});
app.get('/',function(req,res){
res.sendfile('index.html');
});
var checkUser = function(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
};
app.get("/logout", function(req, res) {
  delete req.sess;
  res.redirect("/login");
})


function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', {
    error: err
  });
}



app.post("/login", login.myLogin);
app.get('/signup/addUser', signup.showSignup);
app.post('/signup/addUser', signup.add);
app.get('/questionnare', questionnare.display, middleware.requiresLogin);
app.post('/questionnare/createQuestions',questionnare.createQuestions,middleware.requiresLogin);
app.get('/answers', answers.show,middleware.requiresLogin);
app.post('/answers/update/:answers_id', answers.update,middleware.requiresLogin);
app.get('/record', record.showAllRecords,middleware.requiresLogin);
app.get('/record',record.showRecord,middleware.requiresLogin);
app.post('/answers/add', answers.add,middleware.requiresLogin);


var portNumber = process.env.PORT_NR || 5000;

app.listen(portNumber, function() {
  console.log('App running on:', portNumber);
});
