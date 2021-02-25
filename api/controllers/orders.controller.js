const mongoose = require('mongoose')
const Order = require('../models/orders.models')
const Product = require('../models/products.models');

exports.get_all_orders = (req,res) => {
    Order.find()
    .select('_id product quantity')
    .populate('product','name')
    .exec()
    .then(result => {
        res.status(200).json({
            count: result.length,
            orders: result.map(res => {
                return {
                    _id:res._id,
                    product:res.product,
                    quantity:res.quantity,
                    request:{
                        type:'GET',
                        url:"http://localhost:3000/orders/"+res._id
                    }
                }
            })
            
        })
    })
    .catch(err => {
        res.status(500).json({
            message:err.message
        })
    })
    
}

exports.create_order = (req,res)=>{
    Product.findById(req.body.productId)
    .then(product => {
        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            product:req.body.productId,
            quantity:req.body.quantity
        });
        return order.save()
    })
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            error:err.message
        })
    })
    
}
exports.get_order_details = (req,res)=>{
    Order.findById(req.params.id)
    .populate('product')
    .select('_id product quantity')
    .exec()
    .then(result => {
        res.status(200).json({
            order:result,
            request:{
                type:'GET',
                url:"http://localhost:3000/orders"
            }
        })
    })
}

exports.patch_order = (req,res)=>{
    const id = req.params.productId
    const updateOperations = {}
    for(const ops of req.body){
        updateOperations[ops.propName] = ops.value;
    }
    Order.update({_id:id},{$set:updateOperations})
    .exec()
    .then(result => {
        res.status(200).json({
            message:"Order updated successfully",
            request:{
                type:'GET',
                url:"http://localhost:3000/orders/" + id
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message:err.message
        })
    })
}
exports.delete_order = (req,res)=>{
    Order.remove({_id:req.params.id}).exec()
    .then(result => {
        res.status(200).json({
            message:"Order deleted"
        })
    })
    .catch(err => {
        res.status(500).json({
            message:err
        })
    })
}