const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
    res.render("planos",{ title: "Planos" });
});

module.exports = router;
