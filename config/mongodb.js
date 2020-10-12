const mongoose = require('mongoose');

const mongoOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
};

const connect = (mongoUrl) => mongoose.createConnection(mongoUrl, mongoOptions);

const connectToMongoDb = () => {
    const db = connect(process.env.MONGODB_URL);
    db.on('open', () => {
        console.info(`Mongoose connection open to ${JSON.stringify(process.env.MONGODB_URL)}`);
    });
    db.on('error', (err) => {
        console.info(`Mongoose connection error: ${err} with connection info ${JSON.stringify(process.env.MONGODB_URL)}`);
        process.exit(0);
    });
    return db;
}

/**
 * Exports the connection object
 */
exports.connection = (connectToMongoDb)();