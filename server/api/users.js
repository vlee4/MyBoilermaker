//All routes will be pre-pended with /api/users
const router = require("express").Router();

//GET request to /api/users/
router.get("/", (req, res, next) => {});

//POST request to /api/users/
router.post("/", (req, res, next) => {});

//PUT request to /api/users/:userId
router.put("/:userId", (req, res, next) => {
  const id = req.params.userId;
});

//DELETE request to /api/users/:userId
router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
});

module.exports = router;
