var mysql = require('mysql');

exports.showAllRecords = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT e.name, questionnare.question, answers.answer FROM employees AS e join answers ON e.employee_id = answers.employee_id join questionnare ON questionnare.question_id = answers.question_id;', function(err, results){
            if (err) return next(err)
            res.render('record', {
              no_records : results.length === 0,
  					  records : results,
              is_admin: req.session.employee.is_admin
        });
      });
    });
}

exports.showRecord = function(req,res,next){
  req.getConnection(function(err,connection){
    if(err) return next(err);
    var name = req.session.employee.name

    connection.query('SELECT e.name, questionnare.question, answers.answer FROM employees AS e join answers ON e.employee_id = answers.employee_id join questionnare ON questionnare.question_id = answers.question_id WHERE name =?',[name], function(err, results){
      if(err) return next(err);
      res.render('record',{
        record: results,
        employee: req.session.employee
      })
    })
  })
}
exports.getRecord = function(req, res, next){
	var id = req.params.answers_id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM answers WHERE answers_id = ?', [id], function(err,rows){
			if(err) return next(err);
			res.render('editAnswers');
		});
	});
};
exports.updateRecord = function(req,res,next){
  var data = {
          answers_id : req.body.answers_id,
  };
    var id = req.params.id;
    req.getConnection(function(err, connection){
    if (err) return next(err);
    connection.query('UPDATE answers SET ? WHERE answers_id = ?', [data, id], function(err, rows){
      if (err) return next(err);
          res.redirect('/record');
    });
    });
  }
