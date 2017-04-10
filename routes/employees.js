var mysql = require('mysql');
exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('SELECT * from employees', [], function(err, results) {
        	if (err) return next(err);
    		res.render( 'employees', {
					no_employees : results.length === 0,
					employees : results
    		});
      	});
	});
};
