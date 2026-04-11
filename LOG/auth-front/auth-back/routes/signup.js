const router = require('express').Router();
const { jsonResponse } = require('../lib/jsonResponse');




router.post('/', (req, res) => {
    const { username, name, password } = req.body;

    if (!!!username || !!!name || !!!password) {
        return res.status(400).json(jsonResponse(400, { message: 'All fields are required' }));
    }   

    //usuario creado exitosamente

    res.status(201).json(jsonResponse(201, { message: 'User created successfully' }));
    res.send('Signup route');
});

module.exports = router;