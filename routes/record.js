var mysql = require('mysql');

exports.showAllRecords = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT e.name, questionnare.question, answers.answer FROM employees AS e join answers ON e.employee_id = answers.answers_id join questionnare ON answers.answers_id = questionnare.question_id;', [], function(err, results){
            if (err) return next(err)
            res.render('record', {
              no_records : results.length === 0,
  					  records : results,
              employee: req.session.employee
              // is_admin: req.session.employee.is_admin
        });
      });
    });
}

exports.showRecord = function(req,res,next){
  req.getConnection(function(err,connection){
    if(err) return next(err);
    var data = {
      name: req.session.employee.name
    }
    connection.query('SELECT e.name, questionnare.question, answers.answer FROM employees AS e WHERE name =? join answers ON e.employee_id = answers.answers_id join questionnare ON answers.answers_id = questionnare.question_id;',data, function(err, results){
     console.log(results);
      if(err) return next(err);
      res.render('questionnare',{
        record: results
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
