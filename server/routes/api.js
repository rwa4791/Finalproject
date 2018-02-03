const express = require('express');
const itemsController = require("../controllers/itemsController");

const router = new express.Router();

//
function userUpdateNewItem (dbItem, id) {
  return db.User
    .findByIdAndUpdate(
      id,
      { $push: { item_list: dbItem }},
      { new : true}
    )
}


router.get('/dashboard', (req, res) => {
  res.status(200).json(res);
});

// router /api/item
router.post('/item', (req,res) => {
  db.Item
    .create(req.body)
    //.then( userUpdateNewItem(dbItem,req.params.id))
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(err => res.status(422).json(err));
});

module.exports = router;
