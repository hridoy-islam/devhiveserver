const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId
const serviceSchema = new Schema({
    title: String,
    author: { type: ObjectId, ref: 'author' },
    label: String,
    image: String,
    
});
module.exports = model('service', serviceSchema)