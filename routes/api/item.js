const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");

// Matches with "/api/items"
router.route("/")
  .get(itemsController.findAll);

// Matches with "/api/item/:id"
router
  .route("/:id")
  .get(itemsController.findById)
  .put(itemsController.update)
  .delete(itemsController.remove);
router
  .route("/user/:id")
  .post(itemsController.create);

module.exports = router;
