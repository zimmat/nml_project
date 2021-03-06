function loggedOut(req, res, next){
  if(req.session && req.session.employee){
    return res.redirect('/questionnare');
  }
  return next();
}
function requiresLogin(req, res, next){
  if(req.session && req.session.employee){
    return next();
  }
  else {
    req.flash("warning", "You must be logged in to view this page.");
    return res.redirect("/login");
  }
}
//If visitor is not Admin warn them
function requiresLoginAsAdmin(req, res, next){
  if(req.session.employee.is_admin){
    return next();
  }
  else {
    req.flash("warning", "You must be logged in as admin to view this page.");
    return res.redirect("/login");
  }
}
function registered(req,res,next){
  if(req.session){
    return next();
  }
  else{
    req.flash("warning","you must be registered to view this page");
    return res.redirect("/signup")
  }
}

exports.loggedOut = loggedOut;
exports.requiresLogin = requiresLogin;
exports.requiresLoginAsAdmin = requiresLoginAsAdmin;
exports.registered = registered;
