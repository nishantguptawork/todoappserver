/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

	facebook: function(req, res) {
		passport.authenticate('facebook', { failureRedirect: '/', session:false, scope: ['email', 'profile']  }, function(err, user) {
		  req.logIn(user, function(err) {
			  if (err) {
				  console.log(err);
				  res.view('500');
				  return;
			  }
				  res.ok({user : user});
			  });
		})(req, res);
	},

	google: function(req, res){
		passport.authenticate('google', { failureRedirect: '/', session:false, scope: ['email', 'profile']  }, function(err, user) {
		  req.logIn(user, function(err) {
			  if (err) {
				  console.log(err);
				  res.view('500');
				  return;
			  }
				  res.ok({user : user});
			  });
		})(req, res);
	}
};

