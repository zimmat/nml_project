var mysql = require('mysql');

exports.getAllEmployees = function(req,res,next){
  req.getConnection(function(err,connection){
    if (err) return next(err);
    connection.query('SELECT *  FROM employees',[], function(err,results){
      if (err) return next(err);
      res.render('employees',{
        employees: results
        // is_admin: rolesMap[req.body.name] === "admin",
        // employee: rolesMap[req.body.name] === "Viewer"
      });
    });
  });
}
