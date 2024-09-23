const card = require("../models/card");
ERROR_CODE = Object.freeze({
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
});

module.exports.getCards = (req, res) => {
  card
    .find({})
    .populate("owner")
    .then((cards) => res.send({ data: cards }))
    .catch((err) =>
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" })
    );
};

module.exports.createCards = (req, res) => {
  const { name, link, owner } = req.body;
  card
    .create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE.BAD_REQUEST).send({
          message: "Los datos no son suficientes para crear una carta",
        });
      }
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};

module.exports.deleteCardsId = (req, res) => {
  const { cardId } = req.params;
  card
    .findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = ERROR_CODE.NOT_FOUND;
      throw error;
    })
    .then(() => {
      return res.send({ message: "Carta eliminada con exito" });
    })
    .catch((error) => {
      if (error.statusCode === ERROR_CODE.NOT_FOUND) {
        return res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: error.message });
      }
      if (error.name === "CastError") {
        return res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: "ID de carta no válido" });
      }
      return res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};
module.exports.likeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params._id,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = ERROR_CODE.NOT_FOUND;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((error) => {
      if (error.statusCode === ERROR_CODE.NOT_FOUND) {
        return res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: error.message });
      }
      if (error.name === "CastError") {
        return res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: "ID de carta no válido" });
      }
      return res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};
module.exports.dislikeCard = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params._id,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = ERROR_CODE.NOT_FOUND;
      throw error;
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((error) => {
      if (error.statusCode === ERROR_CODE.NOT_FOUND) {
        return res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: error.message });
      }
      if (error.name === "CastError") {
        return res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: "ID de carta no válido" });
      }
      return res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};
