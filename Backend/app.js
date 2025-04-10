const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const MongoDataBaseConn = require("./src/Config/db.config");
const CloudinaryConn = require("./src/Config/cloudinary.config");
const IndexRoutes = require("./src/Routes/index.route");
const { ratelimitConfig } = require("./src/Config/ratelimit.config");
const { DEVELOPMENT_MODE } = require("./src/Config/index.config");
const errorHandling = require("./src/Utils/errorHandling");
const GoogleAuthRoutes = require("./src/Routes/auth/google.route");
// const corsConfig = require("./src/Config/cors.config");

const app = express();

//----------------------------------------
//------------ config --------------------
//----------------------------------------
// MongoDataBaseConn
MongoDataBaseConn();
CloudinaryConn();

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

// Routes
app.use("/api/v1", IndexRoutes);
app.use("/auth/google", GoogleAuthRoutes);

//----------------------------------------
//--------------- others -----------------
//----------------------------------------
// if no routes findout
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    url: req.baseUrl,
    type: req.method,
    message: "API not found",
  });
});

// response for error message
app.use((err, req, res, next) => {
  errorHandling.handleMainErrorService(err, res);
});

module.exports = app;
