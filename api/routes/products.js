const express = require('express');
const router = express.Router();
// export product model from models/product
const Product = require('../models/products.models')
// to set id, we need to import mongoose
const mongoose = require('mongoose');

router.get('/', (req,res,next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            product: result.map(res => {
                return {
                    name : res.name,
                    price: res.price,
                    _id:res._id,
                    request:{
                        type: 'GET',
                        url: "http://localhost:3000/products/"+res._id
                    }
                }
            })
        }
        console.log(result);
        res.status(200).json(response)
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
       res.status(201).json({
        message:"Create Product successfully",
        createdProduct: {
            name:result.name,
            price:result.price,
            _id:result._id,
            url:"http://localhost:3000/products/"+result._id
        }
    });
   })
   .catch(err =>{ console.log(err)});
    
})
// Get by ID
router.get('/:id', (req,res,next) => {
    const id = req.params.id;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(result => {
         console.log("From Database ",result);
         if(result)
            {
              res.status(200).json({
                  product:result,
                  request:{
                      type:'GET',
                      url:"http://localhost:3000/products/"
                  }
              })
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
        res.status(200).json({
            message:"Product updated successfully",
            request:{
                type:'GET',
                url:"http://localhost:3000/products/"+id
            }
        })
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
        res.status(200).json({
            message:"Product deleted successfully",
            request:{
                type:'POST',
                url:"http://localhost:3000/products/",
                body:{name:'String',price:'Number'}
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err.message
        })
    })
    
})

module.exports = router;