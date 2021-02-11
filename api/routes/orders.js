const express = require('express');
const app = require('../../app');
const router = express.Router();

router.get('/',(req,res) => {
    res.send("Get All Orders")
})
router.post('/',(req,res)=>{
    const Order = {
        status: req.body.status,
        details: req.body.details
    }
    res.status(200).json({
        message:"Order Created",
        order: Order
    })
})
router.get('/:id',(req,res)=>{
    res.send("Get Order by ID")
})
router.patch('/:id',(req,res)=>{
    res.send("Patch Order by ID")
})
router.delete('/:id',(req,res)=>{
    res.send("Delete Order by ID")
})


module.exports = router;