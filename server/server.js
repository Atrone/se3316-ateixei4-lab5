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
        if((req.body.name.includes("<")) || (req.body.price.includes("<")) || (req.body.tax.includes("<")) || (req.body.name.includes(">"))
        || (req.body.price.includes(">")) || (req.body.tax.includes(">")) || (req.body.name.includes("&")) || (req.body.price.includes("&"))
        || (req.body.tax.includes("&")))
        {
            console.log("Filter")
        }
        // validates that price and tax are numbers
        else if((isNaN(req.body.price)) | (isNaN(req.body.tax)) | (isNaN(req.body.quantity)))
        {
            console.log("Validation")
        }
        else
        {
            item.name = req.body.name;  // set the items name (comes from the request)
            item.price = req.body.price;
            item.tax = req.body.tax;
            item.quantity = req.body.quantity;
            // save the item and check for errors
            item.save(function(err) {
                if (err)
                    res.send(err);
            })
        }
       res.redirect('/'); 

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
            console.log(req.params.item_id);
            console.log(req.body.name);
            
            if (err)
            {
                res.send(err);
            }
            // filter all possible ways to input HTML or Javascript into the app
                item.name = req.body.name;  // set the items name (comes from the request)
                item.price = req.body.price;
                item.tax = req.body.tax;
                item.quantity = req.body.quantity;
                // save the item
                item.save(function(err) {
                    if (err)
                        res.send(err);
                })
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
        res.redirect('/');
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);