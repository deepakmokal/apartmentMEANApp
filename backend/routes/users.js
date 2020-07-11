const dotenv = require('dotenv').config();
var express = require('express');
var router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Roles = require('../models/userroles');

//Registration
router.post('/register', (req, res, next) => {
    var user = new User({
        email: req.body.email,
        password: User.hashPassword(req.body.password),
        creation_Dt: Date.now(),
        isActive: true
    });

    let promise = user.save();

    promise.then(function(doc) {
        return res.status(201).json(doc);
    });

    promise.catch(function(err) {
        return res.status(501).json({
            message: 'Something went wrong'
        })
    })

});
//Registration Ends

router.get('/menu', (req, res)=>{
   return res.status(201).json(Roles);
})

//Login
router.post('/login', (req, res, next) => {

    let promise = User.findOne({
        email: req.body.email
    }).exec();

    promise.then(function(doc) {
        //Checking user is present or not

        if (doc && doc.isActive) {
            //Checking valid password
            if (doc.isValid(req.body.password)) {

                //Genration of Token
                accessToken = jwt.sign({ email: doc.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                return res.status(200).json(accessToken);
            } else {
                return res.status(501).json({ message: 'Invalid Credentials' })
            }
        } else {
            return res.status(501).json({ message: 'User not found' })
        }
    })

    promise.catch(function(err) {
        return res.status(501).json({ message: 'Internal Error' });
    })
});

//Login Ends

//Token Varification

router.get('/username', verifyToken, (req, res, next) => {
    let username = decodedToken.email;
    let user = username.split('@')[0];

    //  console.log('username',username);
    return res.status(200).json(username);

});

//Change Password
router.put('/changePassword', verifyToken, (req, res, next) => {
    debugger;
    let emailId = decodedToken.email;
    let oldPass = req.body.old_password;
    let newPass = req.body.new_password;

    let promise = User.findOne({email: emailId}).exec()

    promise.then(function(doc){
      if(doc && doc.isActive){
         if(doc.isValid(oldPass)){
             let newPassword = User.hashPassword(newPass);
             let changePass = User.updateOne({email: emailId},{$set: {password:newPassword}}).exec()

             changePass.then(function(doc){
                return res.status(200).json("Password has been updated successfully");
             })
                 
             
             changePass.catch(function(err){
                 return res.status(500).json("Error In Password Update")
             })



         }else{
             return res.status(501).json("Old Password Doesn't Matched")
         } 
        return  res.status(200).json(doc)
      }
      else {
        return res.status(501).json({ message: 'Invalid Credentials' })
    }  
      
    })

    promise.catch(function(err) {
        return res.status(501).json({ message: 'Internal Error' });
    })
    
});

//Change Email
router.put('/changeEmail', verifyToken, (req, res, next)=>{
    let emailId = decodedToken.email;
    let old_email = req.body.old_email;
    let new_email = req.body.new_email;

    let promise = User.findOne({email: emailId}).exec();
    promise.then(function(doc){
        if(doc && doc.isActive){
            if(emailId == old_email){
                let emailUpdatePromise = User.updateOne({email: emailId}, {$set: {email: new_email}}).exec()
                emailUpdatePromise.then(function(doc){
                    return res.status(200).json("Email Updated Successfully.")
                });
                emailUpdatePromise.catch(function(err){
                    return res.status(500).json("Error occoured while updating Email");
                })
            }
            else{
                return res.status(500).json('Email not match')
            }
        }
    })
    promise.catch(function(err){
        return res.status(500).json("User not found")
    })
})


let decodedToken = '';

function verifyToken(req, res, next) {
    
    let token = req.query.token;
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function(err, tokendata) {
        if (err) {
            return res.status(501).json({ message: 'Unarthorized user' })
        }
        if (tokendata) {
            decodedToken = tokendata;
            next();
        }
    })
}


module.exports = router;