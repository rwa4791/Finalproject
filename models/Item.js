//Import libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const items = {
  price: { type : Number, require: true,
           default: 0
         },
  date:  { type : Date,
          default: Date.now
         }
};
//Creating schema
const itemSchema = new Schema({
  //_id:
  name:         { type: String    , required: true    },
  description:  { type: String    , required: false   },
  quantity:     { type: String    , required: true    },
  price:        { type: Number    , required: false   },
  itemsSold:  [ {type: Schema.Types.Mixed} ],
  user_id:      { type: Schema.Types.ObjectId,
                  required: true
                },
  date:         { type: Date      , default: Date.now,
                  required: true
                }
});
//Creating models
const Item = mongoose.model("Item", itemSchema);
//Exporting
module.exports = Item;
