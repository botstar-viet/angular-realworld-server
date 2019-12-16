const ArticleDB = require('../dbs/article-db');

const getArticlesByUser = (req, res, next) => {
    const userId = req.params.userId;
    ArticleDB.getManyByUserId(userId)
        .then(rs => res.json(rs))
        .catch((err) => next());
}

const getArticles = (req, res, next) => {
    console.log(req.query.title);
    if (req.query.title) {
        ArticleDB.getManyByTtile(req.query.title)
            .then(rs => res.json(rs))
            .catch((err) => next());
    } else {
        ArticleDB.getMany()
            .then(rs => res.json(rs))
            .catch((err) => next());
    }
}

const createArticle = (req, res, next) => {
    const article = req.body;
    ArticleDB.insertOne(article)
        .then(rs => res.json(rs))
        .catch((err) => next());
}

const getArticleById = (req, res, next) => {
    const id = req.params.id;
    ArticleDB.getOne(id)
        .then(rs => res.json(rs))
        .catch((err) => next());
}

const updateArticle = (req, res, next) => {
    const article = req.body;
    ArticleDB.updateOne(article)
        .then(rs => res.json(rs))
        .catch((err) => next());
}

const deleteArticle = (req, res, next) => {
    const id = req.body.id;
    console.log(req.body);
    console.log(req.body.id);
    ArticleDB.dropOne(id)
        .then(rs => res.json(rs))
        .catch((err) => next());
}

module.exports = { getArticlesByUser, getArticles, createArticle, getArticleById, updateArticle, deleteArticle };