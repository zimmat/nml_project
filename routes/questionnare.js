var mysql = require('mysql');
exports.display = function(req,res,next){
  req.getConnection(function(err,connection){
    if (err) return next(err);
    connection.query('SELECT * FROM questionnare',[], function(err,results){
      if (err) return next(err);
      res.render('questionnare',{
        no_questions: results.length ===0,
        questions: results
      });
    });
  });
}
exports.createQuestions = function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    var data = {
      question: req.body.question
    };
      connection.query('insert into questionnare set ?', data, function(err, results) {
        if (err) return next(err)
        res.redirect('/questionnare');
  });
});
};
