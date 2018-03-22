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

router.post('/item', (req, res) => {
  console.log(req.body);
  itemsController.create(req,res)
});
router.get('/item/user/:id', (req,res) => {
  itemsController.findByUser(req,res);
});

router.post('/item/:id', (req,res) => {
  itemsController.sellItem(req,res);
})
router.put('/item/:id', (req,res) => {
  itemsController.update(req,res);
})
router.delete('/item/:id', (req, res) =>{
  itemsController.remove(req,res);
})

module.exports = router;
