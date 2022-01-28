const express = require("express");
const {
  miniLink,
  novoMiniLink,
  todosOsMiniLinks,
  miniLinkId,
  miniLinkData,
} = require("../controllers/miniLinkController");

const router = express.Router();

router.get("/:id", miniLink);
router.post("/novo/miniLink", novoMiniLink);
router.get("/lista/miniLinks", todosOsMiniLinks);
router.get("/consulta/miniLink/:id", miniLinkId);
router.post("/lista/miniLinks/porData", miniLinkData);

module.exports = {
  routes: router,
};
