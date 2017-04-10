var mysql = require('mysql');

exports.display = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT e.name, questionnare.question, answers.answer FROM employees AS e join answers ON e.employee_id = answers.answers_id join questionnare ON answers.answers_id = questionnare.question_id;', [], function(err, results){
            if (err) return next(err)
            res.render('record', {
              no_records : results.length === 0,
  					records : results
        });
      });
    });
}
