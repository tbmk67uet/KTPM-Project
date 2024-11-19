const express = require("express");
const { getTrafficStats } = require("../controllers/traffic");
const { getServerStats } = require("../controllers/server");

const router = express.Router();

router.get("/traffic-stats", getTrafficStats);
router.get("/server-stats", getServerStats);

module.exports = router;
