//Import libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating schema
const userSchema = new Schema({
  //_id:
  firstName: {  type: String , required: true   },
  lastName:  {  type: String , required: true   },
  userName:  {  type: String , required: true,
                unique: true
             },
  email:     {  type: String , required: true   },
  password:  {  type: String , required: true   },
  item_list: [{ type: Schema.Types.ObjectId }]
});

//Creating models
const User = mongoose.model("User", userSchema);
//Exporting
module.exports = User;
