const router = require('express').Router(),
    user = require('../controllers/user');

router.post('/login', user.login);
router.post('/regis', user.regis);
router.get('/user/:userId', user.getUserByID);

module.exports = router;