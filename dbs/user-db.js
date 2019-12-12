const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");
const UserSchema = require("../models/User");
const uris = "mongodb://localhost:27017/realworld";
const auth = require('../controllers/auth');


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

mongoose.connect(uris, options);
// mongoose.connection.on(`open`, async() => {
//     const rs = await getOneByID('26530f80-1eea-4d2b-98cb-c58a2ab82098');
//     const token = await auth.getToken(rs);
//     console.log({ token });
//     const verify = await auth.verifyToken(token);
//     console.log({ verify });
// })

const User = mongoose.model("User", UserSchema);

const checkAccount = async(username, password) => {
    const user = await User.findOne({ username, password }).lean();
    return user;
};

const getOne = async(username) => {
    const user = await User.findOne({ username }).lean();
    return user;
};

const getOneByID = async(_id) => {
    const user = await User.findById({ _id }).lean();
    return user;
}

const insertOne = async(username, email, password) => {
    const user = new User({
        _id: uuidv4(),
        username: username,
        email: email,
        password: password
    });
    const insert = await User.create(user);
    return insert;
};

const updateOne = async user => {
    let userUpdate = await User.findById({ _id: user._id }).lean();
    userUpdate = merge(user, userUpdate);
    const update = await User.findByIdAndUpdate({ _id: user._id }, {
        username: userUpdate.username,
        email: userUpdate.email,
        password: userUpdate.password,
        articles: userUpdate.articles,
        favorites: userUpdate.favorites
    });
    return update;
};

const writeArticle = async(article, username) => {
    const user = await User.findOne({ username });
    return user; // TODO
};

const favoriteArticle = async(article, username) => {
    //TODO
};

const merge = (input, result) => {
    if (input.username !== null) {
        result.username = input.username;
    }
    if (input.email !== null) {
        result.email = input.email;
    }
    if (input.password !== null) {
        result.password = input.password;
    }
    if (input.articles !== null) {
        result.articles = input.articles;
    }
    if (input.favorites !== null) {
        result.favorites = input.favorites;
    }
    return result;
};

module.exports = {
    getOne,
    insertOne,
    updateOne,
    checkAccount,
    writeArticle,
    favoriteArticle,
    getOneByID
};