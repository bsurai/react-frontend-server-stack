import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as core from "express-serve-static-core";
import * as Express from "express";
import * as path from "path";
import * as cors from "cors";
import auth from "./auth";
import ports from "./constants/ports";

let { PORT_SERVER, PORT_CLIENT } = ports;
const app: Express.Application = Express();
const optionsUrlencoded: bodyParser.OptionsUrlencoded = { extended: false };

app.use('*', cors({ origin: 'http://localhost:'+PORT_CLIENT, credentials: true }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

auth.set(app);

app.use((err, req, res, next) => {
    console.log('500 Internal Server Error: ' + err.message);
    res.send('500 Internal Server Error');
});

app.use((req, res) => {
    console.log('404 Not Found');
    res.send('404 Not Found');
});

let port = process.env.PORT || PORT_SERVER;
app.listen(port, () => {
    
    console.log("Running port " + port);
});
