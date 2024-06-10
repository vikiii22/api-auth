const axios = require('axios');
const crypto = require('crypto');
const { UsersDB } = require('../database/connectionsDB');
const md5 = require('md5');

async function login(req, res) {
    const userDB = await UsersDB();

    let { email, password, idApp } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    try {
        const user = await userDB.findOne({ email, password, idApp }, { projection: { _id:0 } });

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

async function register(req, res) {
    const userDB = await UsersDB();

    let { email, password, username, idApp } = req.body;

    if (!email || !password || !username) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    try {
        const user = await userDB.findOne({ email, idApp }, { projection: { _id:0 } });
        const userName = await userDB.findOne({ usuario: username, idApp }, { projection: { _id:0 } });
        let id = md5(userName + email + Date.now());

        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        if (userName) {
            return res.status(400).json({
                message: 'Username already exists'
            });
        }

        const newUser = {
            id,
            email,
            password,
            usuario: username,
            idApp
        };

        await userDB.insertOne(newUser);

        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        });
    } catch (error) {
        console.error('Error creating user', error);
    }
}

module.exports = {
    login,
    register
};