const express = require("express");
const cors = require("cors");
const faker = require("./repository/fakeruMeu");
const app = express();
const port = 5000;
const WebSocket = require('ws');

app.use(cors());
app.use(express.json());

const paginationRouter = require("./routes/pagination");
app.use("/pagination", paginationRouter);

const statisticsRouter = require("./routes/statistics");
app.use("/statistics", statisticsRouter);

const sortRouter = require("./routes/sorting");
app.use("/sort", sortRouter);

const crudRouter = require("./routes/crud");
app.use("/crud", crudRouter);

const typesRouter = require("./routes/types");
app.use("/types", typesRouter);

const brandsRouter = require("./routes/brands");
app.use("/brands", brandsRouter);

const clientRouter=require("./routes/client");
app.use("/client", clientRouter);

app.get("/", (req, res) => {
  res.send("Hello from the backend server!");
});


const wss = new WebSocket.Server({ server: app.listen(port, () => {
  faker.startGeneratingDevices((newData) => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newData));
      }
    });
  });
  console.log(`Server is running on http://localhost:${port}`);
})});



module.exports = app;
