const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const cardsPath = path.join(__dirname, "../data/cards.json");

router.get("/", (req, res) => {
  fs.readFile(cardsPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ mensaje: "Ha ocurrido un error en el servidor" });
    }
    const cards = JSON.parse(data);
    return res.json(cards);
  });
});

module.exports = router;
