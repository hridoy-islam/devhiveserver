const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId
const serviceSchema = new Schema({

  image: String,
  author:[ { 
    id:{
        type:ObjectId,
        ref:'service'
    },
    img: String, 
    name: String,
    label: String 
  }],
  title: String,
  
});
module.exports = model('service', serviceSchema)