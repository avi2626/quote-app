const express=require('express');
const router=express.Router();
const bcrypt = require('bcryptjs');
const User=require('../../modules/user');
const config=require('../../config/config');
const jwt=require('jsonwebtoken') 
router.post('/',(req,res)=>{
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });}
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(email)){
        return res.status(400).json({ msg: 'invalid email' });
    }
    if(password.length<4){
        return res.status(400).json({ msg: 'password needs to be at least 4 characters' });
    }
    User.findOne({ email })
    .then(user => {
    if(user){return res.status(400).json({ msg: 'User already exists' })};
    const newUser = new User({
        name,
        email,
        password});
          
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save()
        .then(user=>{
        jwt.sign({id:user.id},
            config.jwtSecret,
            {expiresIn:3600},
            (err,token)=>{
                if(err)throw err;
                res.json({
                    token,
                    user:{
                          id:user.id,
                          name:user.name,
                          email:user.email}})
            }
            )    


            
            })
            
            
            })})})
                        
                    })
              
              
              



module.exports=router;