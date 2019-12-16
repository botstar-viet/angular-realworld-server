const router = require('express').Router(),
    article = require('../controllers/article');

router.get('/articles', article.getArticles);
router.get('/articles/:userId', article.getArticlesByUser);
router.get('/article/:id', article.getArticleById);
router.post('/article', article.createArticle);
router.post('/article/editor', article.updateArticle);
router.post('/article/delete', article.deleteArticle);

module.exports = router;