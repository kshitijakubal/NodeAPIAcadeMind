const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message:"Get Products API"

    })
})

router.post('/', (req, res, next) => {
    const Product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message:"Create Product API",
        product: Product
    })
})
// Get by ID
router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    if (id === "product1")
    {
        res.send("Product 1")
    }
    else{
        res.send("Other Products");
    }
})
// Patch
router.patch('/:id', (req,res,next) => {
    res.send("Patch Product");
})
// Delete
router.delete('/:id', (req,res) => {
    res.send("Delete Product")
})

module.exports = router;