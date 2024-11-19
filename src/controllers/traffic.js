const trafficData = {
    pages: {},
    timestamps: [],
  };
  
  function trackTraffic(req, res, next) {
    const page = req.path;
    const now = new Date();
  
    
    if (page === "/api/traffic-stats") {
      return next();
    }
  
    
    trafficData.pages[page] = (trafficData.pages[page] || 0) + 1;
  
    
    trafficData.timestamps.push(now.toISOString());
  
    
    if (trafficData.timestamps.length > 1000) {
      trafficData.timestamps.shift();
    }
  
    next();
  }
  
  function getTrafficStats(req, res) {
    res.json(trafficData);
  }
  
  module.exports = { trackTraffic, getTrafficStats };
  