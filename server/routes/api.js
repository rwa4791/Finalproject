const express = require('express');
const router = new express.Router();
const itemsController = require("../controllers/itemsController");


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


router.post('/item', (req, res) => {
  itemsController.create(req.body)
  res.status(200).json({});
});

// // router /api/item
// router.post('/item', (req,res) => {
//   db.Item
//     .create(req.body)
//     //.then( userUpdateNewItem(dbItem,req.params.id))
//     .then(dbModel => {
//       res.json(dbModel);
//     })
//     .catch(err => res.status(422).json(err));
// });

module.exports = router;
