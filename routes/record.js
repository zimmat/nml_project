var mysql = require('mysql');

exports.showRecord = function(req,res,next){
  req.getConnection(function(err,connection){
    if(err) return next(err);
    var name = req.session.employee.name;
    connection.query('SELECT e.name, questionnare.question,answers.answers_id, answers.answer FROM employees AS e join answers ON e.employee_id = answers.employee_id join questionnare ON questionnare.question_id = answers.question_id WHERE name = ?;',[name], function(err, record){
      if(err) return next(err);
      // console.log(record[0]);
      res.render('record',{
        record: record,
        is_admin: req.session.employee.is_admin,
        employee: req.session.employee
      })
    })
  })
}
exports.getRecord = function(req, res, next){
	var id = req.params.answers_id;
  // console.log("iiiid",id);
	req.getConnection(function(err, connection){
		connection.query('SELECT e.name, questionnare.question,answers.answers_id, answers.answer FROM employees AS e join answers ON e.employee_id = answers.employee_id join questionnare ON questionnare.question_id = answers.question_id WHERE answers_id = ?', [id], function(err,records){
			if(err) return next(err);
			res.render('editAnswer', {
        data: records[0],
        is_admin: req.session.employee.is_admin,
        employee: req.session.employee
		});
	});
});
};
exports.updateRecord = function(req,res,next){
  var data = {
      answer: req.body.answer
  };
  // console.log("data: ",data);
    var id = req.params.answers_id;
    console.log("answer id", id);
    req.getConnection(function(err, connection){
    if (err) return next(err);
    connection.query('UPDATE answers SET ? WHERE answers_id = ?', [data,id], function(err, rows){
      if (err) return next(err);
          res.redirect('/record');
    });
    });
  }
