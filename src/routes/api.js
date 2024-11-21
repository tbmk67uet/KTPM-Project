const express = require("express");
const { getTrafficStats } = require("../controllers/traffic");
const { getServerStats } = require("../controllers/server");
const { getApiData } = require('../controllers/goldPrice');

const router = express.Router();

router.get("/traffic-stats", getTrafficStats);
router.get("/server-stats", getServerStats);

router.get('/data', async (req, res) => {
    try {
        console.log('Fetching data from API...');
        const data = await getApiData();
        res.json(data); 
    } catch (error) {
        console.error('Error fetching data from API:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

module.exports = router;
