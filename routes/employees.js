var mysql = require('mysql');

exports.getAllEmployees = function(req,res,next){
  req.getConnection(function(err,connection){
    if (err) return next(err);
    connection.query('SELECT * name FROM employees',[], function(err,results){
      if (err) return next(err);
      res.render('email',{
        employees: results
      });
    });
  });
}
