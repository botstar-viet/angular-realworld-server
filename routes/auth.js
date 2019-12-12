const router = require('express').Router();
const user = require('../controllers/user');
const auth = require('../controllers/auth');

router.post('/login', user.login);
router.post('/regis', user.regis);
router.get('/user/:userId', user.getUserByID);

module.exports = router;