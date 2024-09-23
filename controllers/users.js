const user = require("../models/user");
ERROR_CODE = Object.freeze({
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
});

module.exports.getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" })
    );
};

module.exports.getUsersId = (req, res) => {
  const { _id } = req.params;
  user
    .findById(_id)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: "Usuario no encontrado" });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE.BAD_REQUEST)
          .send({ message: "ID de usuario no válido" });
      }
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};

module.exports.createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE.BAD_REQUEST).send({
          message: "Los datos no son suficientes para crear un usuario",
        });
      }
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};

module.exports.updateUsers = (req, res) => {
  const { name, about } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      { returnDocument: "after", runValidators: true, new: true }
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE.BAD_REQUEST).send({
          message: "Los datos no son suficientes para actualizar el usuario",
        });
      }
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { returnDocument: "after", runValidators: true }
    )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(ERROR_CODE.BAD_REQUEST).send({
          message: "Los datos no son suficientes para actualizar el usuario",
        });
      }
      res
        .status(ERROR_CODE.INTERNAL_SERVER)
        .send({ message: "Error del servidor" });
    });
};
