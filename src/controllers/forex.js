const axios = require('axios');

async function getForexData() {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
    return response.data.rates.VND;
  } catch (error) {
    throw new Error('Error fetching forex data');
  }
}

module.exports = { getForexData };
