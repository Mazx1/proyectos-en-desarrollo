const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Signout route');
});

module.exports = router;