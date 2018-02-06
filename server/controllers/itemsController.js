const db = require("../models");

function userUpdateNewItem (dbItem, id) {
  return db.User
    .findByIdAndUpdate(
      id,
      { $push: { item_list: dbItem }},
      { new : true}
    )
}
function itemUpdateSoldItem (soldItem, id) {
  return db.Item
    .findByIdAndUpdate(
      id,
      { $push: { itemsSold: soldItem}},
      { new : true}
    )
}
function updateQuantity (req, res) {

}
// Defining methods for the ItemsController
module.exports = {
  findAll: function(req, res) {
    db.Item
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Item
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Item
      .create(req)
      //.then( userUpdateNewItem(dbItem,req.params.id))
      .then(dbModel => {
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Item
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  sellItem: function(req,res){
    db.Item
      .itemUpdateSoldItem(req.body, req.params.id,)
      .then(dbItem => res.json(dbItem))
      .then(updateQuantity())
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Item
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
