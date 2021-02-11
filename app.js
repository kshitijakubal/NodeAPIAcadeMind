const express = require('express');
const app = express();
// To get Request Log message
const morgan = require('morgan')

// importing Routes
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');

app.use(morgan('dev'))

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
module.exports = app;