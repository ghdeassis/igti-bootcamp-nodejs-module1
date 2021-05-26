import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    throw new Error("Error message test");
});

app.post("/", async (req, res, next) =>  {
    try {
        throw new Error("Error message async");
    } catch (err) {
        next(err);
    }    
});

app.use((err, req, res, next) => {
    console.log("Error 1");
    next(err);
});

app.use((err, req, res, next) => {
    console.log("Error 2");
    res.status(500).send("Ocorreu um erro, tente novamente mais tarde.");
});

app.listen(3000, () => {
    console.log("API Started");
});