const express = require("express");
const path = require("path");
const cardsRoutes = require("./routes/cards.js");
const usersRoutes = require("./routes/users.js");
const { PORT = 3000 } = process.env;

const app = express();
app.use("/cards", cardsRoutes);
app.use("/users", usersRoutes);
app.use((req, res) => {
  res.status(400).json({ message: "Recurso Solicitado no Encontrado" });
});

app.listen(PORT, () => {
  console.log(`App corriendo en el puerto: ${PORT}`);
});
