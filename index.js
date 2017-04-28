var express = require('express'),
    exphbs = require('express-handlebars'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    questionnare = require('./routes/questionnare'),
    answers = require('./routes/answers'),
    signup = require('./routes/signup'),
    employees = require('./routes/employees'),
    flash = require('express-flash'),
    record = require('./routes/record'),
    middleware = require('./middlewares/server'),
    login = require('./routes/login'),
    nodemailer = require('nodemailer'),
    hbs = require('nodemailer-express-handlebars'),
    cookieParser = require('cookie-parser');

var app = express();

var dbOptions = {
    host: 'localhost',
    user: 'nml',
    port: 3306,
    password: 'nml177',
    database: 'nmldb'
}

app.engine('handlebars', exphbs({
    defaultLayout: 'base'
}));

app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(flash());

app.use(myConnection(mysql, dbOptions, 'single'));

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000 * 30
    }
}));
app.use(function(req, res, next) {
    if (!req.session.employee &&
        req.path !== '/login' &&
        req.path !== '/signup') {

        return res.redirect('/login');
    }

    next();
});

app.use(function(req, res, next) {

    if (req.session.employee) {
        res.locals.currentUser = req.session.employee;
    }

    //console.log(req.locals);
    next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))
// parse application/json
app.use(bodyParser.json());

var mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'zimkhitha@projectcodex.co',
        pass: 'ymgaxajislsjngqc'
    }
});

mailer.use('compile', hbs({
    viewPath: 'views',
    extName: '.handlebars'
}))

app.get('/', function(req, res, next) {
    res.render('questionnare');
})

app.get('/sendEmail', function(req, res, next) {

    req.getConnection(function(err, connection) {
        connection.query('SELECT * FROM employees', [], function(err, results) {
            //console.log(results);
            if (err) return next(err);

            if (results.length == 0) {
                req.flash("warning", "no recipient");
            } else {

                var maillist = results.map(function(user) {
                    return user.email;
                });

                mailer.sendMail({
                    from: 'zimkhitha@projectcodex.co',
                    to: maillist,
                    subject: 'Questionnare',
                    template: 'email',
                }, function(err, emailResponse) {
                    if (err) {
                        res.send("bad email");
                    }
                    req.flash("message", "email sent");
                    return res.redirect("/");

                });

            };
        });
    });
});
app.get("/signup", middleware.loggedOut, function(req, res, next) {
    res.render("signup");
});
app.get("/login", middleware.loggedOut, function(req, res) {
    res.render("login", {
        showNavBar: false
    });
});
app.post("/login", login.myLogin);
app.get("/", function(req, res) {
    res.render("home", {
        employee: req.session.employee,
        is_admin: req.session.user.is_admin
    })
});
app.get("/logout", function(req, res) {
    delete req.session.employee;
    res.redirect("/login");
})
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}

app.post('/signup', signup.add);
app.get('/employees', employees.getAllEmployees);
app.get('/questionnare', questionnare.display);
app.post('/questionnare/createQuestions', questionnare.createQuestions);
app.get('/answers', answers.show);
app.get('/record', record.showAllRecords);
app.get('/record', record.showRecord);
app.get('/record/edit/answers_id', record.getRecord);
app.post('/record/update/answers_id', record.updateRecord);
app.post('/answers/add', answers.add);


var portNumber = process.env.PORT_NR || 5000;
app.listen(portNumber, function() {
    console.log('App running on:', portNumber);
});
