"use strict";
const app = require("./app");
const config = require("./config");

app.listen(config.port, () =>
  console.log(
    "O MiniLink App está ativo no endereço http://localhost:" + config.port
  )
);
