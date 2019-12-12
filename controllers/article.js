const ArticleDB = require('../dbs/article-db');

const getArticlesByUser = (req, res, next) => {
    const userId = req.params.userId;
    ArticleDB.getManyByUserId(userId)
        .then(
            rs => res.send(rs)
        )
        .catch(
            err => console.trace(err)
        )
}

const getArticles = (req, res, next) => {
    console.log(req.query.title);
    if (req.query.title) {
        ArticleDB.getManyByTtile(req.query.title)
            .then(
                rs => res.send(rs)
            )
            .catch(
                err => console.log(err)
            )
    } else {
        ArticleDB.getMany()
            .then(
                rs => res.send(rs)
            )
            .catch(
                err => console.log(err)
            )
    }
}

const createArticle = (req, res, next) => {
    const article = req.body;
    console.log({ article });
    ArticleDB.insertOne(article)
        .then(
            rs => res.send(rs)
        )
        .catch(
            err => console.log(err)
        )
}

const getArticleById = (req, res, next) => {
    const id = req.params.id;
    ArticleDB.getOne(id)
        .then(rs => res.send(rs))
        .catch(err => console.log(err))
}

const updateArticle = (req, res, next) => {
    const article = req.body;
    ArticleDB.updateOne(article)
        .then(rs => res.send(rs))
        .catch(err => console.log(err))
}

const deleteArticle = (req, res, next) => {
    const id = req.body.id;
    console.log(req.body);
    console.log(req.body.id);
    ArticleDB.dropOne(id)
        .then(rs => res.send(rs))
        .catch(err => console.log(err))
}

module.exports = { getArticlesByUser, getArticles, createArticle, getArticleById, updateArticle, deleteArticle };