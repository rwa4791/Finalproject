//Import libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const items = {
  quantity: { type: Number , required: true,
              default: 1                        },
  price:    { type : Number, required: true,
              default: 0                        },
  date:     { type : Date  , required: true,
              default: Date.now                 }
};
//Creating schema
const itemSchema = new Schema({
  //_id:
  name:         { type: String    , required: true,
                  trim: true                          },

  description:  { type: String    , required: true,
                  trim: true                          },

  quantity:     { type: Number    , required: true    },

  price:        { type: Number    , required: false,
                  default: 0                          },

  itemsSold:  [ {type: Schema.Types.Mixed             } ],

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
