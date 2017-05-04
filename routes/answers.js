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
            answer: req.body.answer,
            question_id: req.body.question_id,
            employee_id: req.body.employee_id
        };
        connection.query('insert into answers set?', data, function(err, results) {
            if (err) return next(err);
            res.redirect('/record');
        });
    });
}
