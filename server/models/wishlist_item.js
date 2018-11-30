// model for wishlist
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Wishlist_ItemSchema   = new Schema({
    name: {type: String, required: true},
    user : {type: String,required:true},
    desc: {type: String,required:false}, 
    pub : {type: Boolean, required: false},
    quantity : {type : Number, required:true},
}, {collection : 'wishlist'}); 

module.exports = mongoose.model('Wishlist_Item', Wishlist_ItemSchema);