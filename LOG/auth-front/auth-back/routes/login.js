const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');




router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!!!username || !!!password) {
        return res.status(400).json(jsonResponse(400, { message: 'All fields are required' }));
    }   

    //Autenticar usuario
    const accessToken = 'access_token';
    const refreshToken = 'refresh_token';
    const user = { 
        id: 1,
        username: 'Manuel',
        name: 'manuel',
    };

    res.status(201).json(jsonResponse(201, { user, accessToken, refreshToken }));
    res.send('Signup route');
});

module.exports = router;  