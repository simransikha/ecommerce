const express = require('express');
const router = express.Router();

const contactForm = require("../controller/formController");

router.route("/contact").post(contactForm);


module.exports = router;