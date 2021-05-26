import http from "http";

http.createServer((req, res) => {
    if ((req.method === "GET") && (req.url === "/teste")) {
        res.write("GET /teste executado com sucesso");
    } else {
        res.write("Hello World 2!");
    }
    res.statusCode = 200;
    res.end();
}).listen(8080);