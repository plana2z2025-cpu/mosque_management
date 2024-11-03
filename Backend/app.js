const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const MongoDataBaseConn = require("./src/Config/db.config");
const IndexRoutes = require("./src/Routes/Index.route");
const { ratelimitConfig } = require("./src/Config/ratelimit.config");
const { DEVELOPMENT_MODE } = require("./src/Config/index.config");
// const corsConfig = require("./src/Config/cors.config");

const app = express();

//----------------------------------------
//------------ config --------------------
//----------------------------------------
// MongoDataBaseConn
MongoDataBaseConn();

if (DEVELOPMENT_MODE === "development") {
  const morgan = require("morgan");
  const {
    morganFilePath,
    morganFormat,
  } = require("./src/Config/morgan.config");
  app.use(morgan(morganFormat.COMBINE, { stream: morganFilePath }));
}

app.use(ratelimitConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//----------------------------------------
//--------------- Routes -----------------
//----------------------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Message",
  });
});

app.use("/api/v1", IndexRoutes);

//----------------------------------------
//--------------- others -----------------
//----------------------------------------
// if no routes findout
app.use("*", (req, res) => {
  res.status(500).json({
    success: false,
    statusCode: 500,
    url: req.baseUrl,
    type: req.method,
    message: "API not found",
  });
});

// response for error message
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    statusCode: err.status || 500,
    message: err.message || "internal server error",
    // stack: err.stack || "not present",
  });
});

module.exports = app;
