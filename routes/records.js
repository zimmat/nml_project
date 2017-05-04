var mysql = require('mysql');
exports.showAllRecords = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT e.name, questionnare.question, answers.answer FROM employees AS e join answers ON e.employee_id = answers.employee_id join questionnare ON questionnare.question_id = answers.question_id;', function(err, results){
            if (err) return next(err)
            // console.log(results);
            res.render('records', {
              no_records : results.length === 0,
  					  records : results,
              is_admin: req.session.employee.is_admin
        });
      });
    });
}
