const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
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

app.get("/", (req, res) => {
  res.send("Hello from the backend server!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
