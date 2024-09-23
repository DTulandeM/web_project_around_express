const express = require("express");
const cardsRoutes = require("./routes/cards.js");
const usersRoutes = require("./routes/users.js");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("conectado a la base de datos");
  })
  .catch((err) => {
    console.log("algo salio mal", err);
  });
app.use((req, res, next) => {
  req.user = {
    _id: "66e8efe5a9a29201542dd76a",
  };

  next();
});

app.use("/cards", cardsRoutes);
app.use("/users", usersRoutes);

app.use((req, res) => {
  res.status(500).json({ message: "Recurso Solicitado no Encontrado" });
});

app.listen(PORT, () => {
  console.log(`App corriendo en el puerto: ${PORT}`);
});
