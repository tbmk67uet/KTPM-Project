const express = require("express");

const router = express.Router();

router.get("/", (req, res) => res.render("home"));
router.get("/containers", (req, res) => res.render("containers"));
router.get("/apis", (req, res) => res.render("apis"));
router.get("/resources", (req, res) => res.render("monitoring"));

module.exports = router;
