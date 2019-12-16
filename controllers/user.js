const UserDB = require('../dbs/user-db'),
    auth = require('../controllers/auth');

const login = (req, res, next) => {
    const user = req.body;
    console.log({ user });
    UserDB.checkAccount(user.username, user.password)
        .then(u => {
            const token = auth.getToken(u);
            res.json({ user: u, token: token });
        })
        .catch((err) => next());
};

const regis = (req, res, next) => {
    const user = req.body;
    UserDB.insertOne(user.username, user.email, user.password)
        .then(rs => res.json(rs))
        .catch((err) => next());
};

const getUserByID = (req, res, next) => {
    const id = req.params.userId;
    UserDB.getOneByID(id)
        .then(rs => res.json(rs))
        .catch((err) => next());
}

module.exports = { login, regis, getUserByID }