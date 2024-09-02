const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const usersPath = path.join(__dirname, "../data/users.json");

router.get("/", (req, res) => {
  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ mensaje: "Ha ocurrido un error en el servidor" });
    }
    const users = JSON.parse(data);
    return res.json(users);
  });
});

router.get("/:_id", (req, res) => {
  fs.readFile(usersPath, { encoding: "utf8" }, (err, data) => {
    const { _id } = req.params;
    if (err) {
      return res
        .status(500)
        .json({ mensaje: "Ha ocurrido un error en el servidor" });
    }
    const users = JSON.parse(data);

    const user = users.find((user) => user._id === _id);

    if (!user) {
      return res.status(400).json({ mensaje: "ID de usuario no encontrado" });
    }
    return res.json(user);
  });
});

module.exports = router;
