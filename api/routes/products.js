const express = require('express');
const router = express.Router();
// export product model from models/product
const Product = require('../models/products.models')
// to set id, we need to import mongoose
const mongoose = require('mongoose');

router.get('/', (req,res,next) => {
    Product.find().exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log("Error while fetching");
        res.status(500).json({
            error:err
        })
    })

    
})

router.post('/', (req, res, next) => {
   const product = new Product({
       _id: new mongoose.Types.ObjectId(),
       name: req.body.name,
       price: req.body.price
   });
//    then - promise , catch -error
   product.save().then(result => {
       console.log(result);
   })
   .catch(err =>{ console.log(err)});
    res.status(201).json({
        message:"Create Product API",
        createdProduct: product
    });
})
// Get by ID
router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    Product.findById(id).exec()
    .then(result => {
         console.log("From Database ",result);
         if(result)
            {
              res.status(200).json(result)
        }
        else{
            res.status(404).json({message:"No valid id"})
        }
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({error:err.message})
    }
    )
})
// Patch
router.patch('/:id', (req,res,next) => {
    const id = req.params.id;
    // for patching
    const updateOperations = {}
    for(const ops of req.body){
        updateOperations[ops.propName] = ops.value
    }
    Product.update({_id:id},{$set:updateOperations})
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            error:err.message
        })
    })
})
// Delete
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    Product.remove({_id:id}).exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err.message
        })
    })
    
})

module.exports = router;