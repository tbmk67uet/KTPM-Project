const axios = require('axios');

const apiUrl = 'http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v';

async function getApiData() {
  try {
    const response = await axios.get(apiUrl);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

module.exports = { getApiData };
