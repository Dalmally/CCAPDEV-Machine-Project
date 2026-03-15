const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI

let isConnected = false

function connectToMongo(callback) {
    mongoose.connect(mongoURI)
    .then(() => {
        isConnected = true;
        console.log('Connected to MongoDB');
        callback(); 
    })
    .catch(err => {
        isConnected = false;
        console.error('MongoDB connection error:', err);
        callback(err); 
    })
}

function getDb() {
    if (!isConnected) {
        throw new Error('Database not connected.');
    }
    return mongoose.connection.db;
}

function signalHandler(signal) {
    console.log("Closing MongoDB connection...");
    mongoose.connection.close()
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGQUIT', signalHandler);

module.exports = {
    connectToMongo,
    getDb
}

