const express = require("express");
const betterSqlite3 = require("better-sqlite3");

const app = express();

const db = betterSqlite3("fruit-database.db");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

const port = 3000;

app.get("/frutas", (req, res) => {
    console.log(req.headers);
    if (req.headers.accept === "application/json") {
        const query = db.prepare("SELECT * FROM fruits");
        const frutas = query.all();
        res.json(frutas);
    }
    else {
        let html = "<ul>";
        const query = db.prepare("SELECT * FROM fruits");
        const frutas = query.all();
        frutas.forEach((frutas) => {
            html += `<li>${frutas.name}</li>`;
        })
        html += "</ul>";
        res.send(html);
        // meter fruta nueva en la bbdd
        // evitar inyección h1
    }
});

app.post("/frutas", (req, res) => {
    console.log(req.headers);
    if (req.headers.accept === "application/json") {
        const query = db.prepare("SELECT * FROM fruits");
        const frutas = query.all();
        res.json(frutas);
    }
});

app.listen(port, () => {
    console.log("Servidor funcionando en el puerto " + port);
});