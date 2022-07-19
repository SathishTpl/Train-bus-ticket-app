// const req = require('express/lib/request');
// if i call the user.model then perform that page
const { UserModel } = require('../models/user.model')

const userRouter = require('express').Router();

//create register api
userRouter.post('/createUser', (req, res) => {
    let user = new UserModel;   
    user.name = req.body.name || '';
    user.gender = req.body.gender || '';
    user.email = req.body.email || '';
    user.phone = req.body.phone || '';
    user.password = req.body.password || '';
    user.save().then((data) => {
        res.status(200).send({message: 'User created successfully', status: '1'});
    })
    .catch(err => {
        res.status(400).send({message: err.message, status: '0'});
    });
});
// -------------------------------------------------------------------------------------------------------
// create login api

userRouter.post('/login',(req,res) => {
    UserModel.findOne ({email:req.body.email ,password:req.body.password}).then((data) => {
        if (data) {
            let{ _id ,email ,phone, gender,name} = data;
            let user = { _id ,email, phone, gender,name};
            res.status(200).send({message: 'User logged in' ,user,status:'1'});
        }  else{
            res.status(200).send({message:'User not matched this credential',user,status:'0'})
        }
    })
    .catch((err) => res.status(400).send({messsage: err.message, status: '0'}))
})


module.exports = userRouter;