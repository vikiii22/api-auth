const md5 = require('md5');
const { AppsDB } = require('../database/connectionsDB');

async function createApp(req, res) {
    const appDB = await AppsDB();
    const { name, description, url, category } = req.body;
    let id = md5(name + Date.now());
    const app = {
        id,
        name,
        description,
        url,
        category
    };

    try {
        await appDB.insertOne(app);
        res.status(201).json({
            message: 'App created successfully',
            app
        });
    } catch (error) {
        console.error('Error creating app', error);
    }
}

module.exports = {
    createApp
};