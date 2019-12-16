const UserDB = require('../dbs/user-db');
const auth = require('../controllers/auth');

const login = (req, res, next) => {
    const user = req.body;
    UserDB.checkAccount(user.username, user.password)
        .then(u => {
            const token = auth.getToken(u);
            Object.assign(u, { token });
            console.log({ u });
            res.send(u);
        })
        .catch(next());
};

const regis = (req, res, next) => {
    const user = req.body;
    UserDB.insertOne(user.username, user.email, user.password)
        .then(rs => res.send(rs))
        .catch(next())
};

const getUserByID = (req, res, next) => {
    const id = req.params.userId;
    UserDB.getOneByID(id)
        .then(rs => res.send(rs))
        .catch(next())
}

module.exports = { login, regis, getUserByID };