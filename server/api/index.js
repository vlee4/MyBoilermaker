//pre-pended with /api
const router = require("express").Router();

// would match all requests to /api/users/, redirecting you to the file that would be named users.js
router.use("/users", require("./users"));
//Can add more specific routes as needed

//If the client requests an api route that doesn't exist, they will be sent to the 404 error handler
router.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

//export so you can use in app
module.exports = router;
