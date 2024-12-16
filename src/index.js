const path = require("path");
const express = require("express");
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const { engine } = require("express-handlebars");
const trafficMiddleware = require("./controllers/traffic").trackTraffic;
const apiRoutes = require("./routes/api");
const pageRoutes = require("./routes/pages");



const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, "public")));

const globalLimiter = rateLimit({
  windowMs: 60 * 100, 
  max: 1000, 
  message: "Quá nhiều yêu cầu từ IP này. Vui lòng thử lại sau.",
});

app.use(globalLimiter);


app.use(trafficMiddleware);


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "resources/views"));


app.use("/api", apiRoutes);
app.use("/", pageRoutes);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
