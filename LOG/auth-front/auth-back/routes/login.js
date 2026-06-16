const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const User = require('../schema/user');
const getUserInfo = require('../lib/getUserInfo');
const express = require("express");

router.post('/', async  (req, res) => {
    const { username, password } = req.body;
    console.log("Body rebid:", { username, password });

    if (!!!username || !!!password) {
        return res.status(400)
        .json(jsonResponse(400,
            { message: 'All fields are required' }));
    }   

    const existingUser = await User.findOne({username});
    if(!existingUser){
        const correctPassword = await existingUser.comparePassword(password , existingUser.password);
        if(correctPassword){
        //Authentic usuario
        const accessToken = existingUser.createAccessToken();
        const refreshToken = existingUser.createRefreshToken();        

        res.status(201).json(jsonResponse(200, { user: getUserInfo(existingUser) , accessToken, refreshToken }));
        return res.send('Signup route');                
        } else{
        res.status(400)
        .json(jsonResponse(400, {
        message: 'User or password incorrect' }));
        }
    }else{
        res.status(400).json(jsonResponse(400, {
        error: 'User not found'
        })); 
    }      

});

module.exports = router;  