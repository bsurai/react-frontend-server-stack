import * as Express from "express";
import * as bodyParser from "body-parser";
import * as core from "express-serve-static-core";
import * as path from "path";
import * as cors from "cors";

const PORT = 4000;
const app: core.Express = Express();
const optionsUrlencoded: bodyParser.OptionsUrlencoded = { extended: false };

app.use('*', cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.urlencoded(optionsUrlencoded));
//app.use(bodyParser.json());

app.post("/auth/:service", (req: core.Request, res: core.Response) => {
    let service: string = req.params.service || "";

    console.log("service=" + service);
    res.status(200)
    res.json({ user: "Me", service });
    // res.end();
    /*if (url && !db.customerUrlExist(url)) {
        let err: string = "URL \"" + url.toUpperCase() + "\" does not exist. Please enter other one.";
        res.setHeader("Content-Type", "text/plain");
        res.send(400, err);
        return;
    };
    res.redirect(303, "/" + url + "/projects");*/
});



app.listen(process.env.PORT || PORT, () => {
    let p = process.env.PORT || PORT;
    console.log("Running port " + p);
});
