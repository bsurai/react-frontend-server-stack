import * as Express from "express";
import * as expressJwt from "express-jwt";
import * as jwt from "jsonwebtoken";
import passport from "./passport";
import ports from "../constants/ports";
import { auth, authOptions, authCallbackOptions } from './config';
import { user as mockUser } from './mockData';

const { PORT_SERVER, PORT_CLIENT } = ports;

const authCall = (req, res, next) => {
    let { provider } = req.params;
    console.log("authCall "+provider);
    passport.authenticate(provider, authOptions[provider])(req, res, next);
};

const authCallback = (req, res, next) => {
    let { provider } = req.params;
    passport.authenticate(provider, authCallbackOptions[provider])(req, res, next);
};

const createToken = (req: Express.Request, res: Express.Response): Express.Response => {
    const expiresIn = 60 * 5; // 5 mins
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    return res;
};

const sendTokenAfterSucceed: Express.Handler = (req, res) => {
    createToken(req, res).redirect('http://localhost:' + PORT_CLIENT + '/repos');
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
    app.get('/auth/:provider', authCall);
    app.get('/auth/:provider/callback', authCallback, sendTokenAfterSucceed);
};

export default {
    passport,
    set
};