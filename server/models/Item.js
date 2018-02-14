//Import libraries
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const items = {
//   quantity: { type: Number , required: true,
//               default: 1                        },
//   price:    { type : Number, required: true,
//               default: 0                        },
//   date:     { type : Date  , required: true,
//               default: Date.now                 }
// };
//Creating schema
const itemSchema = new Schema({
  //_id:
  name:         { type: String    , required: false,
                  trim: true                          },

  description:  { type: String    , required: false,
                  trim: true                          },

  quantity:     { type: Number    , required: false    },

  price:        { type: Number    , required: false,
                  default: 0                          },

  sold:         { type: Number    , required: false,
                  default: 0                          },

  user_id:      { type: Schema.Types.ObjectId,
                  required: false
                },

  date:         { type: Date      , default: Date.now,
                  required: false
                }
});
//Exporting
module.exports = mongoose.model('Item', itemSchema);
