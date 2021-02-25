// export product model from models/product
const Product = require('../models/products.models')
// to set id, we need to import mongoose
const mongoose = require('mongoose');

exports.get_all_products = (req,res,next) => {
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            product: result.map(res => {
                return {
                    name : res.name,
                    price: res.price,
                    productImage: res.productImage,
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
}

exports.create_product = (req, res, next) => {
    console.log(req.file);
   const product = new Product({
       _id: new mongoose.Types.ObjectId(),
       name: req.body.name,
       price: req.body.price,
    //    store image path in db
       productImage: req.file.path
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
            productImage:result.productImage,
            url:"http://localhost:3000/products/"+result._id
        }
    });
   })
   .catch(err =>{ console.log(err)});
    
}
exports.get_product_details =  (req,res,next) => {
    const id = req.params.id;
    Product.findById(id)
    .select('name price _id productImage')
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
}
exports.patch_product =  (req,res,next) => {
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
}
exports.delete_product =  (req,res) => {
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
    
}