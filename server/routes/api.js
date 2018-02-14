const express = require('express');
const router = new express.Router();
const itemsController = require("../controllers/itemsController");


//
// function userUpdateNewItem (dbItem, id) {
//   return db.User
//     .findByIdAndUpdate(
//       id,
//       { $push: { item_list: dbItem }},
//       { new : true}
//     )
// }


router.get('/dashboard', (req, res) => {
  res.status(200).json(res);
});


router.post('/item', (req, res) => {
  itemsController.create(req,res)
});
router.get('/item/user/:id', (req,res) => {
  itemsController.findByUser(req,res);
});

router.post('/item/:id', (req,res) => {
  itemsController.sellItem(req,res);
})

module.exports = router;
