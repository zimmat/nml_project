// var mysql = require('mysql');
// var bcrypt = require('bcrypt');
// exports.login = function(req, res, next) {
//   var user = {
//     name: req.body.name,
//     password: req.body.password,
//   }
//
//
//   req.getConnection(function(err, connection) {
//     connection.query('SELECT * FROM employees WHERE name = ?', [user.name], function(err, results) {
//       console.log(results);
//       if (err) return next(err);
//       if (results.length == 0) {
//         req.flash("warning", "Signup to proceed");
//         res.redirect("/login")
//       } else {
//         var encryptedPassword = results[0];
//         bcrypt.compare(user.password, encryptedPassword.password, function(err, pass) {
//           if (err) return next(err);
//
//           if (pass) {
//             req.session.user = {
//               name: req.body.name,
//               is_admin: rolesMap[req.body.name] === "admin",
//               user: rolesMap[req.body.name] === "Viewer"
//             }
//             res.redirect("/home");
//           } else {
//             req.flash("warning", "incorrect password");
//             return res.redirect("/login");
//           }
//         })
//       }
//     });
//
//   });
// };
