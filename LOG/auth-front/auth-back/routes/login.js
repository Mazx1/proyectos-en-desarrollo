const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Login route');
}); 

module.exports = router;    