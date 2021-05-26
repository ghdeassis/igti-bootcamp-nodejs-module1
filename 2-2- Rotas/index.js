import express from "express";

const app = express();
app.use(express.json());

//all
app.all("/testAll", (req, res) => {
    res.send(req.method);
});

//caracteres especiais
app.get("/teste?", (_, res) => {
    res.send("/teste?");
});

app.get("/buzz+", (_, res) => {
    res.send("/buzz+");
});

app.get("/one*Blue", (req, res) => {
    res.send(req.path);
});

app.post("/test(ing)?", (req, res) => {
    console.log(req.body);
    res.send("/test(ing)?");    
});

app.get(/.*Red$/, (req, res) => {
    res.send("/.*Red$/");    
});

//parametros na rota
app.get("/testParam/:id/:a?", (req, res) => {
    res.send(req.params.id + " " + req.params.a);
});

//parametros via query
app.get("/testQuery", (req, res) => {
    res.send(req.query);
});

//next
app.get("/testMultipleHandlers", (req, res, next) => {
    console.log("Callback 1");
    next();
}, (req, res) => {
    console.log("Callback 2");
    res.end();
});

//next com array
const callback1 = (req, res, next) => {
    console.log("Callback 1");
    next();
};

function callback2 (req, res, next) {
    console.log("Callback 2");
    //next();
    res.end();
};

const callback3 = (req, res) => {
    console.log("Callback 3");
    res.end();
};

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

//route
app.route("/testRoute")
    .get((req, res) => {
        res.send("/testRoute GET");
    })
    .post((req, res) => {
        res.send("/testRoute POST");
    })
    .delete((req, res) => {
        res.send("/testRoute DELETE");
    });

app.listen(3000, () => {
    console.log("API Started!");
});