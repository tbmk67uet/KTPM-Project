const express = require("express");

const router = express.Router();

const { getContainerState } = require('../controllers/dockerService');
const { getForexData } = require('../controllers/forex');
const axios = require('axios');

router.get("/", (req, res) => res.render("home"));
router.get("/forex", (req, res) => res.render("forex"));
router.get("/goldprice", (req, res) => res.render("gold"));
router.get("/resources", (req, res) => res.render("monitoring"));

router.get('/containerstatus1', async (req, res) => {
    try {
      const containersState = await getContainerState(0);
      res.json(containersState.status);
    } catch (error) {
      res.status(500).send('Something went wrong!');
    }
  });
  
  router.get('/containerstatus2', async (req, res) => {
    try {
      const containersState = await getContainerState(1);
      res.json(containersState.status);
    } catch (error) {
      res.status(500).send('Something went wrong!');
    }
  });
  
  router.get('/endpointstatus1', async (req, res) => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/');
      res.json(response.status); 
    } catch (error) {
      res.status(500).send('Something went wrong!');
    }
  });
  
  router.get('/endpointstatus2', async (req, res) => {
    try {
      const response = await axios.get('http://127.0.0.1:3002/');
      res.json(response.status); 
    } catch (error) {
      res.status(500).send('Something went wrong!');
    }
  });
  
  router.get('/forexs', async (req, res) => {
    try {
      const usdToVnd = await getForexData();
      res.json({ USD_VND: usdToVnd });
    } catch (error) {
      console.error('Error fetching forex data:', error);
      res.status(500).send('Something went wrong!');
    }
  });


module.exports = router;
