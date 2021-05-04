const jwt = require('jsonwebtoken');

const handleSignin = (db, bcrypt, req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return Promise.reject('incorrect form submission');
    }
    return db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => user[0])
                    .catch(err => Promise.reject('unable to get user'))
            } else {
                Promise.reject('wrong credentials')
            }
        })
        .catch(err => Promise.reject(err))
}

const getAuthTokenId = () => {
    console.log('auth ok')
}

const signToken = (email) => {
    const jwtPayload = {email};
    return jwt.sign(jwtPayload, process.env.JWT_SECRET,{expiresIn: '1 day'});
}

const createSession = (user) => {
    const {email, id } = user;
    const token = signToken(email);
    return {success: 'true', userId: id, token};
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
    const {authorisation} = req.headers;
    return authorisation ?
        getAuthTokenId() :
        handleSignin(db, bcrypt, req, res)
            .then(data => {
                data.id && data.email ? createSession(data) : Promise.reject(`error: ${data}`);
            })
            .then(session => res.json(session))
            .catch(err => res.status(400).json(err));
}

module.exports = {
    signinAuthentication: signinAuthentication
}