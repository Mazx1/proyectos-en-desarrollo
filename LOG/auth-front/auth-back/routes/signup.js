const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');
const User = require('../schema/user');



router.post('/', (req, res) => {
    const { username, name, password } = req.body;

    if (!!!username || !!!name || !!!password) {
        return res.status(400).json(jsonResponse(400, { message: 'All fields are required' }));
    }   

    /// crear usuario en la base de dato
    try {
        const user = new User();
    const exists = newUser.usernameExist(username);
    if(exists){
        return res.status(400).json(jsonResponse(400, { message: 'Username already exists' }));
    }
    const newUser = new User({
        username,
        name,
        password
    });
    newUser.save();


    //usuario creado exitosamente

    res.status(201).json(jsonResponse(201, { message: 'User created successfully' }));
    res.send('Signup route');
    } catch (error) {
        res.status(500).json(jsonResponse(500, { message: 'Internal server error' }));
    }
});

module.exports = router;