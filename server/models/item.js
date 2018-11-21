// model for item
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var itemSchema   = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    tax: {type: Number, required: false},
    quantity: {type: Number, required: true},
});

module.exports = mongoose.model('Item', itemSchema);