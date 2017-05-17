import * as passport from "passport";
import * as passportFacebook from "passport-facebook";
import * as passportTwitter from "passport-twitter";
import * as googleStrategy from "passport-google-oauth";
import { user as mockUser } from './mockData';
import { auth } from './config';

const FacebookStrategy = passportFacebook.Strategy;
const TwitterStrategy = passportTwitter.Strategy;
const GoogleStrategy = googleStrategy.OAuth2Strategy

const verify = (accessToken, refreshToken, profile, done) => {
    let user = mockUser;
    //User.findOrCreate(..., function (err, user) {
    //    if (err) { return done(err); }
    done(null, user);
    //});
}

passport.use(new FacebookStrategy(auth.facebook, verify));
passport.use(new TwitterStrategy(auth.twitter, verify));
passport.use(new GoogleStrategy(auth.google, verify));

export default passport;