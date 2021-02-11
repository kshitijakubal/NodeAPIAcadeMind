const express = require('express');
const app = express();
// To get Request Log message
const morgan = require('morgan')
// For parsing request data
const bodyParser = require('body-parser')

// importing Routes
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// middleware
app.use('/products', productRoute);
app.use('/orders', orderRoute);

// error Handling
app.use((req,res,next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error)
})
// Handling error from database
app.use((error,req,res,next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})

// Handle Cross-Origin-Resource-Sharing
app.use((req, res, next) => {
    // To give access to any origin ( we can add restrictions here to some websites)
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers",'Origin, X-Requested-With, Content-Type, Accept,Authorization')
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods",'PUT, POST, PATCH, DELETE, GET ')
        return res.status(200).json({});
    }
})
module.exports = app;