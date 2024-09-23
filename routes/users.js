const router = require("express").Router();
const {
  getUsers,
  getUsersId,
  createUsers,
  updateUsers,
  updateAvatar,
} = require("../controllers/users.js");

router.get("/", getUsers);

router.get("/:_id", getUsersId);

router.post("/", createUsers);

router.patch("/me", updateUsers);

router.patch("/me/avatar", updateAvatar);

module.exports = router;
