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
                connection.query('SELECT * FROM employees WHERE name = ?', [employee.name], function(err, results) {
                        if (err) return next(err);
                        if (results.length == 0) {
                            req.flash("warning", "Signup to proceed");
                            res.redirect("/login")
                        } else {
                            var currentEmployee = results[0];
                            // console.log(currentEmployee);

                            if (employee.password === currentEmployee.password) {

                                req.session.employee = {
                                    name: req.body.name,
                                    password: req.body.password,
                                    is_admin: rolesMap[req.body.name] === "admin",
                                    employee: rolesMap[req.body.name] === "Viewer"
                                }
                                res.redirect("/questionnare");
                              }else {
                                    req.flash("warning", "incorrect password");
                                    return res.redirect("/login");
                                }
                            }
                        });
                });

        };
