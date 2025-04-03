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
/*
app.post("/frutas", (req, res) => {
    console.log(req.headers);
    if (req.headers.accept === "application/json") {
        const query = db.prepare("SELECT * FROM fruits");
        const frutas = query.all();
        res.json(frutas);
    }
});
*/
app.post("/frutas", (req, res) => {
    console.log(req.headers);

    const { fruta } = req.body; // Obtener el nombre de la fruta desde el cuerpo de la solicitud

    if (!fruta) {
        return res.status(400).json({ error: "El campo 'fruta' es obligatorio" });
    }

    try {
        const query = db.prepare("INSERT INTO fruits (fruit_name) VALUES (?)");
        const result = query.run(fruta); // Insertar la fruta en la base de datos
        res.json({ id: result.lastInsertRowid, fruit_name: fruta }); // Responder con el ID y el nombre de la fruta insertada
    } catch (error) {
        console.error("Error al insertar en la base de datos:", error.message);
        res.status(500).json({ error: "Error al insertar en la base de datos" });
    }
});

app.listen(port, () => {
    console.log("Servidor funcionando en el puerto " + port);
});