import * as passportFacebook from "passport-facebook";
import * as passportTwitter from "passport-twitter";
import * as passportGoogle from "passport-google-oauth";
import * as passportGithub from "passport-github";

export interface IStrategyOption {
  jwt: { secret: string },
  cookie: { secret: string },
  session: { secret: string },
  facebook: passportFacebook.IStrategyOption,
  github: passportGithub.StrategyOption,
  google: passportGoogle.IOAuth2StrategyOption,
  twitter: passportTwitter.IStrategyOptionBase,
};

export const strategyOptions: IStrategyOption = {
  jwt: { secret: process.env.JWT_SECRET || 'JWT redux-serviceauth-example' },
  cookie: { secret: process.env.COOKIE_SECRET || 'COOKIE redux-serviceauth-example' },
  session: { secret: process.env.SESSION_SECRET || 'SESSION redux-serviceauth-example' },

  // https://developers.facebook.com/
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID || '330688647349626',
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'd1a6964606ad4858696472c9d95734b0',
    callbackURL: "/auth/facebook/callback"
  },
  // https://github.com/cfsghost/passport-github
  // and https://developer.github.com/v3/oauth/
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || '05c26a5be9efb61d5e26',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '32f01a25249e081b58b878ad8ba8904c5d4fd65d',
    callbackURL: "/auth/github/callback"
  },
  // https://cloud.google.com/console/project
  // or https://developers.google.com/identity/sign-in/web/devconsole-project
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '437771450296-0dot4auqqupasfom6b3p55is51kl2r8k.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'M8ebgQCELUwPKg8q8sRKaiYi',
    callbackURL: "/auth/google/callback"
  },

  // https://apps.twitter.com/
  // or https://dev.twitter.com/web/sign-in/implementing
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'UZ6kHY378IufjM6aMOxKIhygc',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'Yk05YtqRb0lUtIDxJjLNbDxVOJ3ojHtYyiuwLahPenxpgEvtig',
    callbackURL: "/auth/twitter/callback"
  },
};

export const authOptions = {
  facebook: { scope: ['email', 'user_location'], session: false },
  twitter: { scope: [], session: true },
  google: {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    session: false
  },
  github: undefined/*{
      client_id: '05c26a5be9efb61d5e26',
      scope: [ 'user','public_repo' ]*/
  //}//{ scope: [ 'user','user:email' ] }//'user:email'
};

export const authCallbackOptions = {
  facebook: { failureRedirect: '/', session: false },
  twitter: { failureRedirect: '/', session: false },
  google: { failureRedirect: '/', session: false },
  github: { failureRedirect: '/', session: false },
};