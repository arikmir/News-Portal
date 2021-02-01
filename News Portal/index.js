"use strict";
const express = require("express");
const morgan = require("morgan");
const { StatusCodes } = require("http-status-codes");
const { mainController } = require("./server/mainController");
const { port, logLevel } = require("./server/settings");

const app = express();
//MORGAN for logging http requests
app.use(morgan(logLevel));

app.use(express.static(`${__dirname}/client`));

//Endpoint: ROOT
app.get("/", (_, res) => {
  res.status(StatusCodes.OK).sendFile(`${__dirname}/client/index.html`);
});

//Endpoint: headlines
app.get("/headlines", mainController.headlines);

//Endpoint: search
app.get("/search", mainController.search);

//start server on port 3000
app.listen(port, () => console.log(`Server Started on Port: ${port}`));
