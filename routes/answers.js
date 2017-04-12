var mysql = require('mysql');
exports.show = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err) return next(err);
        connection.query('SELECT * from questionnare', [], function(err, results) {
            if (err) return next(err);
            res.render('record', {
                no_questions: results.length === 0,
                questions: results
            });
        });
    });
};

exports.add = function(req, res, next) {
  req.getConnection(function(err, connection) {
        if (err) return next(err);
        var data = {
            answer: req.body.answer
        };
        connection.query('insert into answers set?', data, function(err, results) {
          console.log(results);
            if (err) return next(err);
            res.redirect('/record');
        });
    });
}
exports.update = function(req, res, next){

	var data = {
					question_id : req.body.question_id,
	};
  	var id = req.params.id;
  	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('UPDATE answers SET ? WHERE question_id = ?', [data, id], function(err, rows){
			if (err) return next(err);
      		res.redirect('/home');
		});
    });
};
