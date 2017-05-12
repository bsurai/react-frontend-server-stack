import * as Express from "express";
import * as expressJwt from "express-jwt";
import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import * as passportFacebook from "passport-facebook";
import ports from "../constants/ports";
import { auth } from './config';

const { PORT_SERVER, PORT_CLIENT } = ports;
const FacebookStrategy = passportFacebook.Strategy;

passport.use(new FacebookStrategy(auth.facebook,
    (accessToken, refreshToken, profile, done) => {
        console.log("passport.use(new FacebookStrategy");

        /* console.log("accessToken");
         console.log(accessToken);
         console.log("refreshToken");
         console.log(refreshToken);
         console.log("profile");
         console.log(profile);
         console.log("done");
         console.log(done);*/

        let user = { user: "me", service: "facebook" };

        //User.findOrCreate(..., function (err, user) {
        //    if (err) { return done(err); }
        done(null, user);
        //});
    }
));

const set = (app: Express.Application): void => {

    app.use(expressJwt({
        secret: auth.jwt.secret,
        credentialsRequired: false,
        getToken: (req) => req.cookies.id_token,
    }).unless({ path: ['/', '/404'] }),
        (req, res, next) => {
            //if (!req.user.admin) return res.sendStatus(401);
            //res.sendStatus(200);
            // console.log("req.user");
            // console.log(req.user);
            next();
        }
        );
    app.use(passport.initialize());

    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: ['email', 'user_location'], session: false }),
    );

    app.get('/auth/:service/callback',
        passport.authenticate('facebook', { failureRedirect: '/', session: false }),
        (req, res) => {
            let service: string = req.params.service || "";
            console.log("callback service=" + service);

            const expiresIn = 60 * 5; // 5 mins
            const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
            res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
            res.redirect('http://localhost:' + PORT_CLIENT);
        },
    );
};

export default {
    passport,
    set
};