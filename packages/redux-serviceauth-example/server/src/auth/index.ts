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

const authCallbackFacebook2: Express.Handler = (req, res) => {
    let service: string = req.params.service || "";
    /*console.log("authCallbackHandlerFacebook2");
    console.log("callback service=" + service);
    console.log("req.user=");
    console.log(req.user);*/

    const expiresIn = 60 * 5; // 5 mins
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('http://localhost:' + PORT_CLIENT+'/repos');
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
        console.log("req.cookies.id_token")
        console.log(req.cookies.id_token)
        return req.cookies.id_token},
});// .unless({path:['/auth/facebook', '/auth/facebook/callback']});

const authLoginCallback: Express.Handler = (req, res, next): void => {
    // Here you can write user verifying.
    // console.log("req.cookies.id_token")
    // console.log(req.cookies.id_token)
    console.log("req.user")
    console.log(req.user)
    console.log("req.baseUrl")
    console.log(req.baseUrl)
    console.log("req.url")
    console.log(req.url)

    if (!req.user) {
        console.log("ERROR /auth/login")
        res.sendStatus(401);
        // res.status(401).redirect('http://localhost:' + PORT_CLIENT + '/401');
        //res.redirect('http://localhost:' + PORT_CLIENT + '/401');
        return;
    };

    console.log("SUCCESS /auth/login")
    res.status(200).json(mockUser);
};

const set = (app: Express.Application): void => {
    // app.use(jwtWithOptions, authLoginCallback);
    app.use('/auth/login', jwtWithOptions, authLoginCallback);

    app.use(passport.initialize());

    app.get('/auth/facebook', authFacebook);
    app.get('/auth/:service/callback', authCallbackFacebook1, authCallbackFacebook2);
};

export default {
    passport,
    set
};