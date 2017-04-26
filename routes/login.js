var mysql = require('mysql');

var rolesMap = {
    "Zee": "Viewer",
    "Zimkhitha": "admin"
};
var sess;
exports.myLogin = function(req, res, next) {
        // sess = req.session;
        var employee = {
            name: req.body.name,
            password: req.body.password,
        }

        req.getConnection(function(err, connection) {
                if (err){
                  return next(err);
                }

                connection.query('SELECT * FROM employees WHERE name = ?', [employee.name], function(err, results) {
                        if (err) return next(err);
                        if (results.length == 0) {
                            req.flash("warning", "Signup to proceed");
                            res.redirect("/login")
                        } else {
                            var currentEmployee = results[0];
                            // console.log(currentEmployee);

                            if (employee.password === currentEmployee.password) {
                             var getRole = function(rolesMap){
                                if(rolesMap[req.body.name] === "admin"){
                                  return is_admin
                                }else{
                                  return employee
                                }
                                  }
                                req.session.employee = {
                                    name: req.body.name,
                                    password: req.body.password,
                                    role: getRole(rolesMap)
                                }
                                console.log(req.session.employee);
                                res.redirect("/questionnare");
                              }else {
                                    req.flash("warning", "incorrect password");
                                    return res.redirect("/login");
                                }
                            }
                        });
                });

        };
