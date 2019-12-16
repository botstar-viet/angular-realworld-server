const router = require('express').Router(),
    article = require('../controllers/article'),
    errorHandler = require('./error');

router.get('/articles', article.getArticles, errorHandler.handleError);
router.get('/articles/:userId', article.getArticlesByUser, errorHandler.handleError);
router.get('/article/:id', article.getArticleById, errorHandler.handleError);
router.post('/article', article.createArticle, errorHandler.handleError);
router.post('/article/editor', article.updateArticle, errorHandler.handleError);
router.post('/article/delete', article.deleteArticle, errorHandler.handleError);

module.exports = router;