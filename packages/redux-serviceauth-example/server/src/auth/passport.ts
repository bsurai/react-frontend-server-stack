import * as passport from "passport";
import * as passportFacebook from "passport-facebook";
import * as passportTwitter from "passport-twitter";
import * as passportGoogle from "passport-google-oauth";
import * as passportGithub from "passport-github";
import { user as mockUser } from './mockData';
import { strategyOptions } from './config';

const FacebookStrategy = passportFacebook.Strategy;
const TwitterStrategy = passportTwitter.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;
const GithubStrategy = passportGithub.Strategy;

const verify = (accessToken, refreshToken, profile, done) => {
    console.log("verify provider's data")
    let user = mockUser;
    //User.findOrCreate(..., function (err, user) {
    //    if (err) { return done(err); }
    done(null, { user });
    //});
}

passport.use(new FacebookStrategy(strategyOptions.facebook, verify));
passport.use(new TwitterStrategy(strategyOptions.twitter, verify));
passport.use(new GoogleStrategy(strategyOptions.google, verify));
passport.use(new GithubStrategy(strategyOptions.github, verify));

export default passport;