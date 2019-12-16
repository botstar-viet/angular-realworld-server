const mongoose = require("mongoose"),
    uuidv4 = require("uuid/v4"),
    UserSchema = require("../models/User"),
    uris = "mongodb://localhost:27017/realworld",
    md5 = require('MD5');



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
//     const user = await checkAccount('pviet', '1234');
//     console.log({ user });
// })

const User = mongoose.model("User", UserSchema);

const checkAccount = async(username, pass) => {
    const password = md5(pass);
    let user = await User.findOne({ username, password }).lean();
    user.password = pass;
    console.log({ user }, 'db');
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
        password: md5(password),
    });
    const insert = await User.create(user);
    return insert;
};

const updateOne = async(user) => {
    const update = await User.findByIdAndUpdate({ _id: user._id }, { user });
    return update;
};

const writeArticle = async(article, username) => {
    const user = await User.findOne({ username });
    return user; // TODO
};

const favoriteArticle = async(article, username) => {
    //TODO
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