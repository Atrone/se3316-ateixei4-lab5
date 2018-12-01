// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var port = 8081;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://atrone:Drt83711!@ds155203.mlab.com:55203/productstutorial2'); // connect to our database


var Item     = require('./models/item.js');
var Wishlist_Item     = require('./models/wishlist_item.js');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET URL/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/items')

    // create a item (accessed at POST URL)
    .post(function(req, res) {
        console.log("hi");
        var item = new Item();      // create a new instance of the item model
        // filter all possible ways to input HTML or Javascript into the app
        if((req.body.name.includes("<")) || (req.body.name.includes(">"))
        || (req.body.name.includes("&")) || (req.body.comment.includes("<")) || (req.body.comment.includes(">"))
        || (req.body.comment.includes("&"))|| (req.body.desc.includes("<")) || (req.body.desc.includes(">"))
        || (req.body.desc.includes("&"))|| (req.body.coll.includes("<")) || (req.body.coll.includes(">"))
        || (req.body.coll.includes("&")))
        {
            console.log("Filter")
        }
        // validates that price and tax are numbers
        else if((isNaN(req.body.price)) | (isNaN(req.body.quantity)) | (isNaN(req.body.rating)))
        {
            console.log("Validation")
        }
        else
        {
            console.log("Getting there");
            item.name = req.body.name;  // set the items name (comes from the request)
            item.price = req.body.price;
            item.quantity = req.body.quantity;
            item.rating = req.body.rating;
            item.comment = req.body.comment;
            item.user = req.body.user;
            item.coll = req.body.coll;
            item.desc = req.body.desc;
            item.pub = req.body.pub;
            // save the item and check for errors
            item.save(function(err) {
                if (err)
                    res.send(err);
            })
        }
       //res.redirect('/'); 

    })
    // get all the items (accessed at GET URL)
    .get(function(req, res) {
        Item.find(function(err, items) {
            if (err)
                res.send(err);
            console.log(items)
            res.json(items);
        });
    }
);
router.route('/items/:item_id')

    // get the item with that id (accessed at GET URL)
    .get(function(req, res) {
        Item.findById(req.params.item_id, function(err, item) {
            if (err)
                res.send(err);
            res.json(item);
        });
    }) 
    .put(function(req, res) {

        // use our item model to find the item we want
        Item.findById(req.params.item_id, function(err, item) {
            if (err)
            {
                res.send(err);
            }
            if((req.body.name.includes("<")) || (req.body.name.includes(">"))
            || (req.body.name.includes("&")) || (req.body.comment.includes("<")) || (req.body.comment.includes(">"))
            || (req.body.comment.includes("&"))|| (req.body.desc.includes("<")) || (req.body.desc.includes(">"))
            || (req.body.desc.includes("&"))|| (req.body.coll.includes("<")) || (req.body.coll.includes(">"))
            || (req.body.coll.includes("&")))
            {
                console.log("Filter")
            }
            // validates that price and tax are numbers
            else if((isNaN(req.body.price)) | (isNaN(req.body.quantity)) | (isNaN(req.body.rating)))
            {
                console.log("Validation")
            }
            else
            {
            // filter all possible ways to input HTML or Javascript into the app
            item.name = req.body.name;  // set the items name (comes from the request)
            item.price = req.body.price;
            item.quantity = req.body.quantity;
            item.rating = req.body.rating;
            item.comment = req.body.comment;
            item.user = req.body.user;
            item.coll = req.body.coll;
            item.desc = req.body.desc;
            item.pub = req.body.pub;
                // save the item
                item.save(function(err) {
                    if (err)
                        res.send(err);
                })
            }
        })
    })
    // delete the item with this id (accessed at DELETE URL)
    .delete(function(req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function(err, item) {
            if (err)
                res.send(err);
        })
    });
    
// more routes for our API will happen here
router.route('/coll')

    // create a item (accessed at POST URL)
    .post(function(req, res) {
        console.log("hi");
        var wishlistItem = new Wishlist();      // create a new instance of the item model
        // filter all possible ways to input HTML or Javascript into the app
        if((req.body.name.includes("<")) || (req.body.name.includes(">"))
        || (req.body.name.includes("&")) || (req.body.desc.includes("<")) || (req.body.desc.includes(">"))
        || (req.body.desc.includes("&")))
        {
            console.log("Filter")
        }
        // validates that price and tax are numbers
        else if((isNaN(req.body.quantity)))
        {
            console.log("Validation")
        }
        else
        {
            console.log("Getting there");
            wishlistItem.name = req.body.name;  // set the items name (comes from the request)
            wishlistItem.price = req.body.price;
            wishlistItem.quantity = req.body.quantity;
            wishlistItem.user = req.body.user;
            wishlistItem.desc = req.body.desc;
            wishlistItem.pub = req.body.pub;
            // save the item and check for errors
            wishlistItem.save(function(err) {
                if (err)
                    res.send(err);
            })
        }
       //res.redirect('/'); 

    })
    // get all the items (accessed at GET URL)
    .get(function(req, res) {
        Wishlist_Item.find(function(err, Wishlist_Items) {
            if (err)
                res.send(err);
            console.log(Wishlist_Items)
            res.json(Wishlist_Items);
        });
    }
);
router.route('/coll/:item_id')

    // get the item with that id (accessed at GET URL)
    .get(function(req, res) {
        Wishlist_Item.findById(req.params.item_id, function(err, wishlist_Item) {
            if (err)
                res.send(err);
            res.json(wishlist_Item);
        });
    }) 
    .put(function(req, res) {

        // use our item model to find the item we want
        Wishlist_Item.findById(req.params.item_id, function(err, wishlist_Item) {
            if (err)
            {
                res.send(err);
            }
            if((req.body.name.includes("<")) || (req.body.name.includes(">"))
            || (req.body.name.includes("&")) || (req.body.comment.includes("<")) || (req.body.comment.includes(">"))
            || (req.body.comment.includes("&"))|| (req.body.desc.includes("<")) || (req.body.desc.includes(">"))
            || (req.body.desc.includes("&"))|| (req.body.coll.includes("<")) || (req.body.coll.includes(">"))
            || (req.body.coll.includes("&")))
            {
                console.log("Filter")
            }
            // validates that price and tax are numbers
            else if((isNaN(req.body.price)) | (isNaN(req.body.quantity)) | (isNaN(req.body.rating)))
            {
                console.log("Validation")
            }
            else
            {
            // filter all possible ways to input HTML or Javascript into the app
                wishlist_Item.name = req.body.name;  // set the items name (comes from the request)
                wishlist_Item.price = req.body.price;
                wishlist_Item.tax = req.body.tax;
                wishlist_Item.quantity = req.body.quantity;
                // save the item
                wishlist_Item.save(function(err) {
                    if (err)
                        res.send(err);
                })
            }
        })
    })
    // delete the item with this id (accessed at DELETE URL)
    .delete(function(req, res) {
        Wishlist_Item.remove({
            _id: req.params.item_id
        }, function(err, wishlist_Item) {
            if (err)
                res.send(err);
        })
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);