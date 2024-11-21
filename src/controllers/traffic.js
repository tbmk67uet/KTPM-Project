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

    if (page === "/api/server-stats") {
      return next();
    }

    if (page === "/css/header.css") {
      return next();
    }

    if (page === "/containerstatus1") {
      return next();
    }

    if (page === "/containerstatus2") {
      return next();
    }

    if (page === "/endpointstatus1") {
      return next();
    }

    if (page === "/endpointstatus2") {
      return next();
    }
  
    
    trafficData.pages[page] = (trafficData.pages[page] || 0) + 1;
    
    trafficData.timestamps.push(now.toISOString());
  
    
    if (trafficData.timestamps.length > 999) {
      trafficData.timestamps.shift();
    }
  
    next();
  }
  
  function getTrafficStats(req, res) {
    res.json(trafficData);
  }
  
  module.exports = { trackTraffic, getTrafficStats };
  