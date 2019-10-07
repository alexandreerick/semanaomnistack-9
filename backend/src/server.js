// Importando Dependencias e outras coisas
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const socketio = require("socket.io");
const http = require("http");

const routes = require("./routes");

// Criando o App
const app = express();

const server = http.Server(app);
const io = socketio(server);

// Conectando com a DB
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@omnistack-4hmro.mongodb.net/semana09?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// Parte real time
const connectedUsers = {};

io.on("connection", socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

// GET, POST, PUT, DELETE

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
server.listen(3333);
