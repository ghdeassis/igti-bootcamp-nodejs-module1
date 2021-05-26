import express from "express";
import { promises as fs } from "fs";
import cors from "cors";

const { readFile, writeFile } = fs;

const router = express.Router();

router.post("/", async (req, res, next) => {
    try {
        let account = req.body;

        if (!account.name || account.balance == null) {
            throw new Error("Name e Balance são obrigatórios.");
        }

        const data = JSON.parse(await readFile(global.fileName));

        account = { 
            id: data.nextId++, 
            name: account.name,
            balance: account.balance
        };
        data.accounts.push(account);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);

        logger.info(`POST /account - ${JSON.stringify(account)}`);
    } catch (err) {        
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data);
        logger.info("GET /account");
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const account = data.accounts.find(
            account => account.id === parseInt(req.params.id));
        res.send(account);
        logger.info("GET /account/:id")
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));    
        data.accounts = data.accounts.filter(
            account => account.id !== parseInt(req.params.id));        
        await writeFile(global.fileName, JSON.stringify(data, null, 2));        
        res.end();
        logger.info(`DELETE /account/:id - ${req.params.id}`)
    } catch (err) {
        next(err);  
    }
});

router.put("/", async (req, res, next) => {
    try {
        const account = req.body;

        if (!account.id || !account.name || account.balance == null) {
            throw new Error("Id, Name e Balance são obrigatórios.");
        }

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(a => a.id === account.id);

        if (index === -1) {
            throw new Error("Registro não encontrado.");
        }

        data.accounts[index].name = account.name;
        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(account);

        logger.info(`PUT /account - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);               
    }
});

router.patch("/updateBalance", async (req, res, next) => {
    try {
        const account = req.body;

        const data = JSON.parse(await readFile(global.fileName));
        const index = data.accounts.findIndex(a => a.id === account.id);

        if (!account.id || account.balance == null) {
            throw new Error("Id e Balance são obrigatórios.");
        }

        if (index === -1) {
            throw new Error("Registro não encontrado.");
        }

        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(data.accounts[index]);

        logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);    
    res.status(400).send({ error: err.message });    
});

export default router;