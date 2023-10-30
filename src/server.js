import express from "express";
import bodyParser from "body-parser";

import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
require("dotenv").config();
import connectDB from "./config/connectDB";
// import cors from 'cors'

let app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log("App is running on port : ", port);
});
