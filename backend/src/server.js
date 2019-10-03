// Importando Dependencias e outras coisas
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const routes = require("./routes");

// Criando o App
const app = express();

// Conectando com a DB
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@omnistack-4hmro.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Require e Response

// req.query = acessar query params (para filtros)
// req.params = Acessar route params (para ediçao e delete)
// req.body = Acessar corpo da requisiçao (Para criaçao e ediçao)

// Cors
app.use(cors());

// Configurar o Express para usar json
app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(routes);

// Escutar a porta
app.listen(3333);
