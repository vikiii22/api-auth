const { MongoClient } = require('mongodb');

let connected = false;
async function connect(dbName) {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        if (connected) {
            return client.db(dbName);
        } else {
            await client.connect();
            console.log('Connected to the database');
            connected = true;
            return client.db(dbName);
        }
    } catch (error) {
        console.error('Error connecting to the database', error);
    }

}

module.exports = {
    connect
}
