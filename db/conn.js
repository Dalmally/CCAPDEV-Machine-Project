import { MongoClient } from 'mongodb';

const mongoURI = process.env.MONGODB_URI
const client = new MongoClient(mongoURI);

export function connectToMongo(callback) {
    client.connect().then( (client) => {
        return callback();
    }).catch( err => {
        callback(err);
    })
}

export function getDb(dbName = "users") {
    return client.db(dbName);
}

function signalHandler(signal) {
    console.log("Closing MongoDB connection...");
    client.close();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);
