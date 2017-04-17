var mysql = require('mysql');

var rolesMap = {
  "Zee": "Viewer",
  "Zimkhitha": "admin"
};
var sess;
exports.myLogin = function(req,res,next){
  sess = req.session;
var employee = {
  name: req.body.name,
  password: req.body.password,
}

req.getConnection(function(err, connection) {
  connection.query('SELECT * FROM employees WHERE name = ?', [employee.name], function(err, results) {
    if (err) return next(err);
    if (results.length == 0) {
      req.flash("warning", "Signup to proceed");
      res.redirect("/login")
    } else {
      var dbPassword = results[0];
        if (employee.password === dbPassword.password) {
          sess = {
            name: req.body.name
          }
           console.log(sess.name + ' ' + 'is in session');
          res.redirect("/questionnare");
        } else {
          req.flash("warning", "incorrect password");
          return res.redirect("/login");
        }
      }
    });
  });

};
