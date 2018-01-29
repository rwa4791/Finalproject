const router = require("express").Router();
const userRoutes = require("./user");
const itemRoutes = require("./item");

// User routes
router.use("/users", userRoutes);
router.use("/items", itemRoutes);

module.exports = router;
