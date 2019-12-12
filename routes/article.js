const router = require('express').Router();
const article = require('../controllers/article')
const articledb = require('../dbs/article-db');

// router.get('/articles/', (req, res) => {
//     console.log(req.body);
//     let articles = [];
//     articles = await articledb.getMany();
//     res.send(articles);
// });
router.get('/articles', article.getArticles);
router.get('/articles/:userId', article.getArticlesByUser);
router.get('/article/:id', article.getArticleById);
router.post('/article', article.createArticle);
router.post('/article/editor', article.updateArticle);
router.post('/article/delete', article.deleteArticle);

module.exports = router;