exports.add = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        var data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        var confirmPassword = req.body.confirmPassword;
        if (data.password !== confirmPassword) {
          req.flash("warning","passwords do not match");
            res.redirect('/signup');
        } else {
            connection.query('insert into employees set ?', data, function(err, results) {
                if (err) next (err);
                res.redirect('/login');
            });
        };
    });
};
