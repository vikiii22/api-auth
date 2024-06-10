const { connect } = require('../database/connection');

async function UsersDB() {
    const db = await connect(process.env.BD_MONGO);
    return db.collection('users');
}

async function AppsDB() {
    const db = await connect(process.env.BD_MONGO);
    return db.collection('apps');
}

module.exports = {
    UsersDB,
    AppsDB
}