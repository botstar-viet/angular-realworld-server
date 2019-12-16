const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const ArticleSchema = require('../models/Article');
const uris = 'mongodb://localhost:27017/realworld';

const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};
const Article = mongoose.model('Article', ArticleSchema);

mongoose.connect(uris, options);
// mongoose.connection.once('open', async() => {
//     const article = new Article({
//         title: 'Awsome to be a bedethai',
//         description: 'oiwhjwojh',
//         body: 'qijgqiajgokisjwikow',
//         favoriteCount: 0,
//         author: '26530f80-1eea-4d2b-98cb-c58a2ab82098'
//     })
//     const rs = await insertOne(article);
//     console.log({ rs });
// })


const getOne = async(_id) => {
    const article = await Article.findById({ _id }).lean();
    console.log({ article });
    return article;
}

const getManyByTtile = async(title) => {
    const articles = await Article.find({ title: { $regex: title, $options: "i" } }).lean();
    return articles;
}

const getMany = async() => {
    const articles = await Article.find({}).lean();
    console.log({ articles }, `articles -- db`);
    return articles;
}

const getManyByUserId = async(userId) => {
    const articles = await Article.find({ author: userId }).lean();
    return articles;
}

const insertOne = async(article) => {
    article._id = uuidv4();
    article.favorites = [];
    const insert = await Article.create(article);
    return insert;
}

const updateOne = async(article) => {
    const update = await Article.findByIdAndUpdate({ _id: article._id }, { article });
    console.log({ update });
    return update;
}

const dropOne = async(_id) => {
    const drop = await Article.findByIdAndRemove(_id).lean();
    return drop;
}

const updateFavorites = async(user, article) => {
    let articleUpdate = await Article.findById({ _id: article._id }).lean();
    articleUpdate.favorites.push(user._id);
    articleUpdate.favoriteCount++;
    const favorites = await updateOne(articleUpdate);
    return favorites;
}

module.exports = { getOne, getMany, insertOne, updateOne, dropOne, updateFavorites, getManyByUserId, getManyByTtile };