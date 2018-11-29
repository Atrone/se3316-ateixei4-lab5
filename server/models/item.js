// model for item
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var itemSchema   = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: false},
    quantity: {type: Number, required: false},
    rating : {type: Number, required: false},
    comment : {type: String, required: false},
    coll : {type: String, required: false},
    user : {type: String,required:true},
    desc: {type: String,required:false}, 
    pub : {type: Boolean, required: false},
}); 

module.exports = mongoose.model('Item', itemSchema);