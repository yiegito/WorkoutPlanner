const { MongoClient } = require('mongodb');
require('dotenv').config()

// const config = require('../config.json');


const mongo = () => {
    const mongoURL = process.env.URL;
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