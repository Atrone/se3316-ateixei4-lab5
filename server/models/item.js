// model for item
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var itemSchema   = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    rating : {type: Number, required: true},
    comment : {type : String, required: true},
    coll : {type :Number, required: false},
    user : {type:String,required:true},
}); 

module.exports = mongoose.model('Item', itemSchema);