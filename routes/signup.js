var bcrypt = require('bcrypt');
exports.showSignup = function(req, res) {
  res.render('signup');
}

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var data = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
      confirmPassword :req.body.confirmPassword
    };
    if(req.body.password !== req.body.confirmPassword){
        res.redirect('/signup');
    }else{
      connection.query('insert into employees set ?', data, function(err, results) {
        if (err) return next(err)
        res.redirect('/login');
});
};
});
};
