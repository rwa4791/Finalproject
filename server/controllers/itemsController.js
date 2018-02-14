const db = require("../models");
const mongoose = require('mongoose');

function userUpdateNewItem (dbItem, id) {
  return db.user
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
      { $inc:
        {
          quantity: -(soldItem.quantity),
          sold: (soldItem.quantity)
        }
      },
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
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findByUser: function(req, res) {
    db.Item
      .find({
        'user_id': mongoose.Types.ObjectId(req.params.id)
      })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Item
      .create(req.body)
      .then(dbItem => {
        userUpdateNewItem(dbItem ,req.body.user_id)
        res.json(dbItem)
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
    itemUpdateSoldItem(req.body, req.params.id)
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
