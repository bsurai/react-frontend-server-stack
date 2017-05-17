import * as Express from "express";
import * as expressJwt from "express-jwt";
import * as jwt from "jsonwebtoken";
import passport from "./passport";
import ports from "../constants/ports";
import { auth } from './config';
import { user as mockUser } from './mockData';

const { PORT_SERVER, PORT_CLIENT } = ports;

const authOptions = {
    facebook: { scope: [], session: false },//{ scope: ['email', 'user_location'], session: false },
    twitter: { scope: [], session: false },
    google: {
        scope: [
            'https://www.googleapis.com/auth/plus.login',
            'https://www.googleapis.com/auth/plus.me',
            'https://www.googleapis.com/auth/userinfo.email'            
        ],
        session: false
    },//{ scope: ['https://www.googleapis.com/auth/plus.login'] },
};

const authCall = {
    facebook: passport.authenticate('facebook', authOptions.facebook),
    twitter: passport.authenticate('twitter', authOptions.twitter),
    google: passport.authenticate('google', authOptions.google),
};

const authCallbackOptions = {
    facebook: { failureRedirect: '/', session: false },
    twitter: { failureRedirect: '/', session: false },
    google: { failureRedirect: '/', session: false },
};

const authCallback = {
    facebook: passport.authenticate('facebook', authCallbackOptions.facebook),
    twitter: passport.authenticate('twitter', authCallbackOptions.twitter),
    google: passport.authenticate('google', authCallbackOptions.google),
};

const createToken = (req: Express.Request, res: Express.Response): Express.Response => {
    const expiresIn = 60 * 5; // 5 mins
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    return res;
};

const sendTokenAfterSucceed: Express.Handler = (req, res) => {
    console.log('authCallback2 - 1')
    createToken(req, res).redirect('http://localhost:' + PORT_CLIENT + '/repos');
    console.log('authCallback2 - 2')
};

const jwtWithOptions = expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: false,
    getToken: (req) => {
        return req.cookies.id_token
    },
});

const authLoginCallback: Express.Handler = (req, res, next): void => {
    // Here you can write user verifying.
    if (!req.user) {
        console.log("ERROR /auth/login")
        res.sendStatus(401);
        return;
    };

    console.log("SUCCESS /auth/login");
    // createToken(req, res).status(200).json(mockUser);
    res.status(200).json(mockUser);
};

const set = (app: Express.Application): void => {
    app.use('/auth/login', jwtWithOptions, authLoginCallback);
    app.use(passport.initialize());
    app.get('/auth/facebook', authCall.facebook);
    app.get('/auth/google', authCall.google);
    app.get('/auth/twitter', authCall.twitter);
    // app.get('/auth/github', authGithub);
    app.get('/auth/facebook/callback', authCallback.facebook, sendTokenAfterSucceed);
    app.get('/auth/google/callback', authCallback.google, sendTokenAfterSucceed);
    app.get('/auth/twitter/callback', authCallback.twitter, sendTokenAfterSucceed);
    // app.get('/auth/github/callback', authCallbackGithub1, sendTokenAfterSucceed);
};

export default {
    passport,
    set
};