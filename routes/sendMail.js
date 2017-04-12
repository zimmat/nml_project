// const nodemailer = require('nodemailer');
//
// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'zimkhitha@projectcodex.co',
//         pass: process.env.GMAIL_PASSWORD
//     }
// });
//
// // setup email data with unicode symbols
// let mailOptions = {
//     from: '"Fred Foo 👻" <zimmatshangaza.gmail>', // sender address
//     to: 'zimkhitha@projectcodex.co', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plain text body
//     template: email // html body
// };
//
// // send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });

var nodemailer = require('nodemailer');
var path = require('path');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

const pathExists = require('path-exists');

// pathExists('/home/react/projects/nml_project/views/email.html').then(exists => {
//     console.log(exists);
//     //=> true
// });
//
// var readHTMLFile = function(path, callback) {
//     fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
//         if (err) {
//             throw err;
//             callback(err);
//         }
//         else {
//             callback(null, html);
//         }
//     });
// };
// smtpTransport = nodemailer.createTransport(smtpTransport({
//     service: 'gmail',
//     auth: {
//       user: 'zimkhitha@projectcodex.co',
//       pass: process.env.GMAIL_PASSWORD
//     }
// }));
//
// readHTMLFile(__dirname + 'email.html', function(err, html) {
//     var template = handlebars.compile(html);
//     var replacements = {
//          username: "Zimkhitha Matshangaza"
//     };
//     var htmlToSend = template(replacements);
//     var mailOptions = {
//         from: 'zimkhitha@projectcodex.co',
//         to : 'zimkhitha@projectcodex.co',
//         subject : 'test subject',
//         html : htmlToSend
//      };
//     smtpTransport.sendMail(mailOptions, function (error, response) {
//         if (error) {
//             console.log(error);
//             callback(error);
//         }
//       });
//     });
