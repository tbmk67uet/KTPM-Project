const path = require("path");
const express = require("express");
const si = require("systeminformation");
const app = express();
const { engine } = require("express-handlebars");
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "resources\\views"));

let previousNetworkStats = null;

app.get("/api/server-stats", async (req, res) => {
  try {
    const network = await si.networkStats(); // Lấy thông tin mạng hiện tại
    const cpu = await si.currentLoad(); // Lấy thông tin CPU
    const memory = await si.mem();
    const currentStats = network[0]; // Chọn adapter đầu tiên

    // Kiểm tra nếu có dữ liệu trước đó
    let bandwidth = { sent: 0, received: 0 };
    if (previousNetworkStats) {
      const timeDiff = (currentStats.ms - previousNetworkStats.ms) / 1000; // Tính thời gian (giây)
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

    // Cập nhật giá trị hiện tại cho lần tiếp theo
    previousNetworkStats = currentStats;

    res.json({
      cpu: cpu.currentLoad.toFixed(2), // Tải CPU hiện tại
      memory: {
        total: memory.total ? (memory.total / 1024 / 1024).toFixed(2) : 0, // Tổng RAM (MB)
        used:
          memory.total && memory.available
            ? ((memory.total - memory.available) / 1024 / 1024).toFixed(2)
            : 0, // RAM đã sử dụng (MB)
      },
      bandwidth,
    });
  } catch (error) {
    console.error("Error in /api/server-stats:", error);
    res.status(500).json({ error: "Failed to fetch server stats" });
  }
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/containers", (req, res) => {
  res.render("containers");
});

app.get("/apis", (req, res) => {
  res.render("apis");
});

app.get("/resources", (req, res) => {
  res.render("monitoring");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
