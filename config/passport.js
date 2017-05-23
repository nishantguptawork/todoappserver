var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var configAuth = require('./auth');
var User = require('../api/models/user');


var verifyHandler = function(token, tokenSecret, profile, done) {
	process.nextTick(function() {
        console.log("nextTick");
		User.findOne({uid: profile.id}, function(err, user) {
            console.log("outside user");
			if (user) {
                console.log("if user");
				user.access_token = token;
				user.save(function(err, doc) {
                             return done(err, doc);
                        }
										);
				return done(null, user);
			} else {
				console.log("-----------------USER DATA IS : ", profile);
				var data = {};
				data = {
					access_token : token,
					name : profile.displayName,
					uid : profile.id
				};
				User.create(data, function(err, user) {
				  return done(err, user);
				});
			}
		});
	});
};

// var verifyHandler2 = function(accessToken, refreshToken, profile, done) {
//             User.findOrCreate(
//                 { facebookId: profile.id },
//                 function (err, result) {
//                     if(result) {
//                         result.access_token = accessToken;
//                         result.save(function(err, doc) {
//                             done(err, doc);
//                         });
//                     } else {
//                         done(err, result);
//                     }
//                 }
//             );
//         };


// var verifyHandler3 = function(token, refreshToken, profile, done) {

//         // make the code asynchronous
//         // User.findOne won't fire until we have all our data back from Google
//         process.nextTick(function() {

//             // try to find the user based on their google id
//             User.findOne({ 'google.id' : profile.id }, function(err, user) {
//                 if (err)
//                     return done(err);

//                 if (user) {

//                     // if a user is found, log them in
//                     return done(null, user);
//                 } else {
//                     // if the user isnt in our database, create a new user
//                     var newUser          = new User();

//                     // set all of the relevant information
//                     newUser.uid    = profile.id;
//                     newUser.google.token = token;
//                     newUser.google.name  = profile.displayName;
//                     newUser.google.email = profile.emails[0].value; // pull the first email

//                     // save the user
//                     newUser.save(function(err) {
//                         if (err)
//                             throw err;
//                         return done(null, newUser);
//                     });
//                 }
//             });
//         });

//     };


module.exports.http = {
	customMiddleware: function(app) {
        console.log("through middleware");
		passport.use(new FacebookStrategy({
		  clientID: configAuth.facebookAuth.clientID,
		  clientSecret: configAuth.facebookAuth.clientSecret,
		  callbackURL: configAuth.facebookAuth.callbackURL
		}, verifyHandler));


	// 	 passport.use(new GoogleStrategy({

    //     clientID        : configAuth.googleAuth.clientID,
    //     clientSecret    : configAuth.googleAuth.clientSecret,
    //     callbackURL     : configAuth.googleAuth.callbackURL,

    // },verifyHandler3));

		app.use(passport.initialize());
		app.use(passport.session());
	}
}


passport.serializeUser(function(user, done) {
  done(null,user.uid);
});

passport.deserializeUser(function(uid, done) {
	User.findOne({uid:uid}, function(err, user) {
		done(err, user);
	});
});
