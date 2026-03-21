const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Refresh token route');
});

module.exports = router;