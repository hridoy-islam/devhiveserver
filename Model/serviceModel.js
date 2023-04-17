const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId
const serviceSchema = new Schema({
    category: String,
    title: String,
    author: { type: ObjectId, ref: 'author' },
    review:{ 
        rating: Number,
        details: String,
        uid:{ type: ObjectId, ref: 'user' }
    },
    gallery: String,
    description: String,
    type:[],
    others:[],
    packages:[
        {
        name: String,
        title: String,
        detail: String,
        features:[],
        total: Number,
        },
],
  
});
module.exports = model('service', serviceSchema)