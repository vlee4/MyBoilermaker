//Entry point for server JS
const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const port = process.env.PORT || 1337;

//Logging middleware: helps with debugging
app.use(morgan("dev"));

//Parsing middleware: to access req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static middleware: static files often found in public folder (js files, css, images)

app.use(express.static(path.join(__dirname, "..", "public")));
//OR
// app.use(express.static(path.join(__dirname, '../public')))

//by convention API routes are prefixed with /api/ which helps to differentiate them from front-end routes created by the react-router

//uses the routes in our api folder
app.use("/api", require("./api"));

//for any requests that don't match our API routes, the index.html will be sent
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

//Error handling
//If anything else goes wrong along the way we can implement a 500 error handler to catch those errors
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

//Listen for requests to the server
//app.listen may be wrapped  in db.sync() if you're syncing a database
app.listen(port, () => {
  console.log(`Listening on port ${port}
  http://localhost:1337/

  `);
});

// export for use when you need to sync the db
module.exports = app;
