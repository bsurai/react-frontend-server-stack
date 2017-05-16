import * as Express from "express";
import * as expressJwt from "express-jwt";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import * as passportFacebook from "passport-facebook";
import ports from "../constants/ports";
import { auth } from './config';

const mockUser = { user: "me", service: "facebook" };

const { PORT_SERVER, PORT_CLIENT } = ports;
const FacebookStrategy = passportFacebook.Strategy;

const authFacebook: Express.Handler = passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false });

const authCallbackFacebook1: Express.Handler = passport.authenticate('facebook', { failureRedirect: '/', session: false });

const createToken = (req: Express.Request, res: Express.Response): Express.Response => {
    console.log(1)
    const expiresIn = 60 * 5; // 5 mins
    console.log(2)
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    console.log(3)
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    console.log(4)
    return res;
};

const authCallbackFacebook2: Express.Handler = (req, res) => {
    createToken(req, res).redirect('http://localhost:' + PORT_CLIENT + '/repos');
};

passport.use(new FacebookStrategy(auth.facebook,
    (accessToken, refreshToken, profile, done) => {
        let user = mockUser;
        //User.findOrCreate(..., function (err, user) {
        //    if (err) { return done(err); }
        done(null, user);
        //});
    }
));

const jwtWithOptions = expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: false,
    getToken: (req) => {
        return req.cookies.id_token
    },
});

const authLoginCallback: Express.Handler = (req, res, next): void => {
    // Here you can write user verifying.
    // console.log("req.cookies.id_token")
    // console.log(req.cookies.id_token)

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

    app.get('/auth/facebook', authFacebook);
    app.get('/auth/:service/callback', authCallbackFacebook1, authCallbackFacebook2);
};

export default {
    passport,
    set
};