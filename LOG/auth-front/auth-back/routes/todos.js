const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Todos route');
});

module.exports = router;