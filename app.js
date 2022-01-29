"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const miniLinkRoutes = require("./routes/miniLink-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/", miniLinkRoutes.routes);

module.exports = app;
