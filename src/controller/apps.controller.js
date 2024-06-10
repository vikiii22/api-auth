const md5 = require('md5');
const { AppsDB, UsersDB } = require('../database/connectionsDB');

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

    let appExists = await appDB.findOne({ url }, { projection: { _id: 0 } });
    if (appExists) {
        return res.status(400).json({
            message: 'App already exists, id: ' + appExists.id,
        });
    }

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

async function deleteApp(req, res) {
    const appDB = await AppsDB();
    const userDB = await UsersDB();
    const { id } = req.params;

    try {
        await appDB.deleteOne({ id });
        await userDB.deleteMany({ idApp: id });
        res.status(200).json({
            message: 'App deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting app', error);
    }
}

module.exports = {
    createApp,
    deleteApp
};