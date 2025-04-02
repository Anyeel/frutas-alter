const express = require("express");
const sqlite3 = require('sqlite3');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const port = 3000;

const table = "fruits";

const frutasdb = new sqlite3.Database('fruit-database.db', (err) => {
  if (err) {
      console.error('Error al conectar con la base de datos:', err.message);
  } else {
      console.log('Conectado a la base de datos SQLite.');
  }
});


app.post("/frutas", (req, res) => {
  const fruta = req.body.fruta;
  console.log("Esto ha llegado desde el cliente:", fruta);

  const consulta = `INSERT INTO ${table} (fruit_name) VALUES (?)`;

  frutasdb.run(consulta, [fruta], function (err) {
      if (err) {
          console.error('Error al insertar en la tabla:', err.message);
          res.status(500).json({ error: 'Error al insertar en la base de datos' });
      } else {
          console.log('Fruta insertada con éxito, ID:', this.lastID);
          res.json({ id: this.lastID, fruit_name: fruta });
      }
  });
});

app.get("/frutas", (req, res) => {
  const consulta = `SELECT id, fruit_name FROM ${table}`;

  frutasdb.all(consulta, [], (err, rows) => {
      if (err) {
          console.error('Error al consultar la tabla:', err.message);
          res.status(500).json({ error: 'Error al obtener los datos de la tabla' });
      } else {
          console.log('Datos de la tabla frutas:', rows);
          res.json(rows);
      }
  });
});


app.listen(port, () => console.log('Servidor funcionando en el puerto ' + port));
