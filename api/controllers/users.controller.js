const mongoose = require('mongoose');
// For storing hash password
const bcrypt = require('bcrypt');
// jwt token for Authorization
const jwt = require('jsonwebtoken');

const User = require('../models/users.models');

exports.user_signup = (req,res,next)=> {
    User.find({email:req.body.email}).exec()
    .then(user =>{
        if(user.length >= 1){
            // 409 means conflict
            // 422 means unprocessable entity
            res.status(409).json({
                message:'Mail exists'
            })
        }
        else{
            // 10 is the salting value
    bcrypt.hash(req.body.password,10, (err,hash) => {
        if(err) {
            res.status(500).json({
                error:err
            })
            
        }
        else{
            const user = new User({
                _id:mongoose.Types.ObjectId(),
                email:req.body.email,
                password: hash
            });
            user.save()
            .then(result => {
                res.status(201).json({
                    message:'User Created'
                });
            })
            .catch(err => {
                res.status(500).json({
                    error:err
                })
            })
        }
    })
        }
    }
    )   
}
exports.user_login = (req,res,next) => {
    User.find({email:req.body.email}).exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message:'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Auth failed'

                })
            }
            if(result){
                const token = jwt.sign(
                    {email:user[0].email,
                     userId:user[0]._id},
                    process.env.JWT_KEY,
                    {
                        expiresIn:"1h"
                    });
                return res.status(200).json({
                    message:'Auth successful',
                    token:token
                   
                })
            }
            res.status(401).json({
                message:'Auth failed'
            });
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}

exports.delete_user = (req,res,next) => {
    User.remove({_id:req.params.userId}).exec()
    .then(result=>{
        res.status(200).json({
            message:"User deleted"
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}