const express = require("express");
const { contactFormController } = require("../controllers");

const router = express.Router();

router.post("/", contactFormController.sendContactMail);
router.post("/", contactFormController.sendSubscriptonMail);

module.exports = router;
