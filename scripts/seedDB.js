const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/inventoryAssistant",
  {
    useMongoClient: true
  }
);
//Users seed
const usersSeed = [
  {
    firstName: "Hector",
    lastName:  "Candelaria",
    userName:  "hcandelaria",
    email:     "hcandelaria66.7@gmail.com",
    password:  "password",
  },
  {
    firstName: "Hector",
    lastName:  "Candelaria",
    userName:  "hcandelaria",
    email:     "hcandelaria66.7@gmail.com",
    password:  "password",
  },
  {
    firstName: "Hector",
    lastName:  "Candelaria",
    userName:  "hcandelaria",
    email:     "hcandelaria66.7@gmail.com",
    password:  "password",
  },
  {
    firstName: "Will",
    lastName:  "Smith",
    userName:  "wsmith",
    email:     "wsmith@gmail.com",
    password:  "password",
  },
  {
    firstName: "Jennifer",
    lastName:  "Espinal",
    userName:  "jespinal",
    email:     "jespinal@gmail.com",
    password:  "password",
  },
];
db.User
  .remove({})
  .then(() => db.User.collection.insertMany(usersSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
