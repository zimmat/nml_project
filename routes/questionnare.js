var mysql = require('mysql');
exports.createQuestions = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var data = {
      question: req.body.question
    };
      connection.query('insert into questionnare set ?', data, function(err, results) {
        if (err) return next(err)
        res.redirect('/sendEmail');
  });
});
};
exports.display = function(req,res,next){
  req.getConnection(function(err,connection){
    if (err) return next(err);
    connection.query('SELECT * FROM questionnare ORDER BY question_id DESC LIMIT 1',[], function(err,results){
      if (err) return next(err);
      res.render('questionnare',{
        no_questions: results.length ===0,
        questions: results,
        is_admin: req.session.employee.is_admin,
        employee: req.session.employee.employee
      });
    });
  });
}
