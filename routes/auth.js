const router = require('express').Router();
const user = require('../controllers/user');
const auth = require('../controllers/auth');

router.post('/login', user.login, errorHandler.handleError);
router.post('/regis', user.regis, errorHandler.handleError);
router.get('/user/:userId', user.getUserByID, errorHandler.handleError);

module.exports = router;