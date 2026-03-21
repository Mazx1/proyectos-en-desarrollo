const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Signup route');
});

module.exports = router;