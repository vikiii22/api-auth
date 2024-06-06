const axios = require('axios');
const crypto = require('crypto');
const { connectar } = require('../database/connection');


async function createConnection() {
    const db = await connectar(process.env.BD_MONGO);
    return db.collection('users');
}

async function login(req, res) {
    const userDB = await createConnection();

    let { email, password } = req.body;
    password = md5(password);

    try {
        const user = await userDB.findOne({ email, password }, { projection: { _id:0 } });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }else{
            res.status(200).json({
                message: 'Login success',
                user
            });
        }
    }catch (error) {
        console.error('Error trying to login', error);
    }
    
}

function md5(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

module.exports = {
    login
};