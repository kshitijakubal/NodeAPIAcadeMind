const express = require('express')
const router = express.Router();

router.get('/',(req,res) => {
    res.send("Get All Orders")
})
router.post('/',(req,res)=>{
    res.send("Post Order")
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