import * as passportFacebook from "passport-facebook";
import * as passportTwitter from "passport-twitter";
import * as googleStrategy from "passport-google-oauth";

export interface IAuth {
  jwt: { secret: string },
  facebook: passportFacebook.IStrategyOption,
  github: {},
  google: googleStrategy.IOAuth2StrategyOption,
  twitter: passportTwitter.IStrategyOptionBase,
};

export const auth: IAuth = {
  jwt: { secret: process.env.JWT_SECRET || 'redux-serviceauth-example' },
  
  // https://developers.facebook.com/
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID || '330688647349626',
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'd1a6964606ad4858696472c9d95734b0',
    callbackURL: "/auth/facebook/callback"
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
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
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
    callbackURL: "/auth/twitter/callback"
  },
};