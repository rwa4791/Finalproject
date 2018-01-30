const router = require("express").Router();
const itemsController = require("../../controllers/itemsController");

// Matches with "/api/items"
router.route("/")
  .get(itemsController.findAll);

// Matches with "/api/items/:id"
router
  .route("/:id")
  .get(itemsController.findById)
  .put(itemsController.update)
  .delete(itemsController.remove);
// Matches with "/api/items/user/:id"
router
  .route("/user/:id")
  .post(itemsController.create);
// Matches with "/api/items/sold/:id"
router
  .route("/sold/:id")
  .put(itemsController.sellItem);
module.exports = router;
