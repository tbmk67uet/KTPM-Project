const path = require("path");
const express = require("express");
const axios = require('axios');
const { engine } = require("express-handlebars");
const trafficMiddleware = require("./controllers/traffic").trackTraffic;
const apiRoutes = require("./routes/api");
const pageRoutes = require("./routes/pages");



const app = express();
const port = 3000;


app.use(express.static(path.join(__dirname, "public")));


app.use(trafficMiddleware);


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "resources/views"));


app.use("/api", apiRoutes);
app.use("/", pageRoutes);



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
