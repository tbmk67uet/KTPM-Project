const si = require("systeminformation");

let previousNetworkStats = null;

async function getServerStats(req, res) {
  try {
    const network = await si.networkStats();
    const cpu = await si.currentLoad();
    const memory = await si.mem();
    const currentStats = network[0];

    
    let bandwidth = { sent: 0, received: 0 };
    if (previousNetworkStats) {
      const timeDiff = (currentStats.ms - previousNetworkStats.ms) / 1000;
      bandwidth = {
        sent: (
          (currentStats.tx_bytes - previousNetworkStats.tx_bytes) /
          timeDiff /
          1024
        ).toFixed(2), // KB/s
        received: (
          (currentStats.rx_bytes - previousNetworkStats.rx_bytes) /
          timeDiff /
          1024
        ).toFixed(2), // KB/s
      };
    }

    previousNetworkStats = currentStats;

    res.json({
      cpu: cpu.currentLoad.toFixed(2),
      memory: {
        total: memory.total ? (memory.total / 1024 / 1024).toFixed(2) : 0,
        used:
          memory.total && memory.available
            ? ((memory.total - memory.available) / 1024 / 1024).toFixed(2)
            : 0,
      },
      bandwidth,
    });
  } catch (error) {
    console.error("Error in /api/server-stats:", error);
    res.status(500).json({ error: "Failed to fetch server stats" });
  }
}

module.exports = { getServerStats };
