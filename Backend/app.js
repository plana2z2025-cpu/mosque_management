const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const MongoDataBaseConn = require("./src/Config/db.config");
const IndexRoutes = require("./src/Routes/index.route");
const { ratelimitConfig } = require("./src/Config/ratelimit.config");
const { DEVELOPMENT_MODE } = require("./src/Config/index.config");
const { errors, isCelebrateError } = require("celebrate");
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
  res.status(404).json({
    success: false,
    statusCode: 404,
    url: req.baseUrl,
    type: req.method,
    message: "API not found",
  });
});

// app.use(errors());
// response for error message
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    // Extract Joi validation errors
    const validationError = {};
    for (const [key, value] of err.details.entries()) {
      validationError[key] = value.details.map((detail) => detail.message);
    }

    // Get the first error message (across all validation segments)
    const firstErrorMessage = Object.values(validationError)
      .flat() // Flatten to merge all arrays
      .shift(); // Get the first error message

    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: firstErrorMessage || "Validation error", // Show only the first error
      details: validationError, // Still include all errors for debugging
    });
  } else {
    res.status(err.status || 500).json({
      success: false,
      statusCode: err.status || 500,
      message: err.message || "internal server error",
      // errorType: err.name,
      // stack: err.stack || "not present",
    });
  }
});

module.exports = app;
