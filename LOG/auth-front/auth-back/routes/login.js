const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const User = require('../schema/user');
const getUserInfo = require('../lib/getUserInfo');


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!!!username || !!!password) {
        return res.status(400).json(jsonResponse(400, { message: 'All fields are required' }));
    }   

    const user = await User.findOne({username});

    if(user){
        const correctPassword = await user.comparePassword(password , user.password);
        if(correctPassword){
        //Authentic usuario
        const accessToken = user.createAccessToken();
        const refreshToken = user.createRefreshToken();        

        res.status(201).json(jsonResponse(200, { user: getUserInfo(user) , accessToken, refreshToken }));
        res.send('Signup route');                
        } else{
        res.status(400)
        .json(jsonResponse(400, {
        message: 'User or password incorrect' }));
        }
    }else{
        res.status(400)
        .jsonResponse(400, {
            message: 'User nor found' }); 
    }      

});

module.exports = router;  