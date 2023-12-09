const { MongoClient } = require('mongodb');

const config = require('../config.json');


const mongo = () => {
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@mernapp.wizglqk.mongodb.net/?retryWrites=true&w=majority`;
    let db = null;

    /**
     * @description         connects to mongo atlas via url and sets db instace
     */
    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();

            console.log('Connected to Mongo DB');
        } catch (error) {
            console.log(error);
        }
    }
    async function find(collectionName, id) {
        try {
            const collection = db.collection(collectionName);

            if (id) {
                return await collection.find({ _id: id }).next();
            } else {
                return await collection.find({}).toArray();
            }
        } catch (error) {
            console.log(error);
        }
    }
    function getDb() {
        return db;
    }
    return {
        connect,
        getDb,
        // save,
        find
        // update
    };
};

module.exports = mongo();