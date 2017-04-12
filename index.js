var express = require('express'),
  exphbs = require('express-handlebars'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  bcrypt = require('bcrypt'),
  mysql = require('mysql'),
  myConnection = require('express-myconnection'),
  questionnare = require('./routes/questionnare'),
  answers = require('./routes/answers'),
  signup = require('./routes/signup'),
  flash = require('express-flash'),
  record = require('./routes/record'),
  middleware = require('./middlewares/server'),
  sendMail = require('./routes/sendMail'),
  hbs = require('nodemailer-express-handlebars');

var app = express();
var dbOptions = {
host: 'localhost',
user: 'root',
password: 'p@$$w0rd',
database: 'nmldb'
}
var rolesMap = {
  "Zee": "Viewer",
  "Zimkhitha": "admin"
};

app.engine('handlebars', exphbs({
  defaultLayout: 'base'
}));

app.set('view engine', 'handlebars');
app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30 // expire after 30 minutes
  }
}));
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.employee_id;
  next();
});

app.use(express.static(__dirname + '/public'));
app.use(flash());
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(bodyParser.urlencoded({
    extended: false
  }))
app.use(bodyParser.json())

app.get("/", function(req, res,next) {
  res.render("home");
});
app.get("/sendEmail", function(req, res,next) {
  res.render("sendEmail");
});
app.get("/login",middleware.loggedOut, function(req, res, next) {
  res.render("login");
});
app.get("/signup",middleware.loggedOut, function(req, res, next) {
  res.render("signup");
});
var checkUser = function(req, res, next) {
  if (req.session.user) {
    return next();
  }
  console.log(checkUser);
  res.redirect("/login");
};
app.get("/logout", function(req, res) {
  delete req.session.user;
  res.redirect("/login");
})
app.post("/login", function(req, res, next) {
  var user = {
    name: req.body.name,
    password: req.body.password,
  }
  console.log('req.body : ');
  console.log(user);

  req.getConnection(function(err, connection) {
    connection.query('SELECT * FROM employees WHERE name = ?', [user.name], function(err, results) {
      if (err) return next(err);
      if (results.length == 0) {
        req.flash("warning", "Signup to proceed");
        res.redirect("/login")
      } else {
        var encryptedPassword = results[0];
        bcrypt.compare(user.password, encryptedPassword.password, function(err, pass) {
          if (err) return next(err);

          if (pass) {
            req.session.user = {
              name: req.body.name,
              is_admin: rolesMap[req.body.name] === "admin",
              user: rolesMap[req.body.name] === "Viewer"
            }
            res.redirect("/questionnare");
          } else {
            req.flash("warning", "incorrect password");
            return res.redirect("/login");
            console.log(  req.session.user);
          }
        })
      }
    });

  });

    });

app.get('/signup/addUser', signup.showSignup);
app.post('/signup/addUser', signup.add);
app.get('/questionnare', questionnare.display, middleware.requiresLogin);
app.post('/questionnare/createQuestions',questionnare.createQuestions,middleware.requiresLogin);
app.get('/answers', answers.show,middleware.requiresLogin);
app.post('/answers/update/:answers_id', answers.update,middleware.requiresLogin);
app.get('/record', record.showAllRecords,middleware.requiresLogin);
app.get('/record',record.showRecord,middleware.requiresLogin);
app.post('/answers/add', answers.add,middleware.requiresLogin);

//configure the port number using and environment number
var portNumber = process.env.CRUD_PORT_NR || 5000;
//start everything up
app.listen(portNumber, function() {
  console.log('App running on:', portNumber);
});
