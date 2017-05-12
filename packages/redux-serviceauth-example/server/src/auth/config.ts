export const auth = {

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
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: "/auth/google/callback"
  },

  // https://apps.twitter.com/
  twitter: {
    clientID: process.env.TWITTER_CONSUMER_KEY || '',
    clientSecret: process.env.TWITTER_CONSUMER_SECRET || '',
    callbackURL: "/auth/twitter/callback"
  },

};