const router = require("express").Router();
const {
  getCards,
  createCards,
  deleteCardsId,
  likeCard,
  dislikeCard,
} = require("../controllers/cards.js");

router.get("/", getCards);
router.post("/", createCards);
router.delete("/:_id", deleteCardsId);
router.put("/:_id/likes", likeCard);
router.delete("/:_id/likes", dislikeCard);

module.exports = router;
