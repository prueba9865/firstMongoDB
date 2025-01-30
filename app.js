// Using Node.js `require()`
require('dotenv').config()
const Ordenador = require("./entities/Ordenador.js")
const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Obtener todos los ítems
app.get("/items", (req, res) => {
    Ordenador.buscarTodos()
    .then(ordenadores => {
      res.json(ordenadores);
    })
    .catch(err => {
      res.status("500").json({"error": err});
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



Ordenador.buscarTodos()