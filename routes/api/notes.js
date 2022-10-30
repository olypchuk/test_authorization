const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const { validateBody } = require("../../middlewares");
const contactSchema = require("../../schemas/contacts");
const ctrl = require("../../controllers/contacts");
const isValidId = require("../../middlewares/isValidId");
const updateFavoriteSchema = require("../../schemas/favorite");
const authMiddleware = require("../../middlewares/authMiddleware");
const { addNote,getById } = require("../../controllers/note")

const router = express.Router();

router.use(authMiddleware);

router.post("/", addNote)
router.get('/:noteId', getById)


module.exports = router

