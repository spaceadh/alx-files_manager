// utils/db.js
// import { MongoClient } from 'mongodb';
import mongodb from 'mongodb';
const { MongoClient } = mongodb;
import envloader from './env_loader.js';

/**
 * Represents a MongoDB client.
 */

class DBClient {
    /**
    * Creates a new DBClient instance.
    */
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        const uri = `mongodb://${host}:${port}`;
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        this.client.connect((err) => {
            if (err) {
                console.error(`MongoDB client not connected to the server: ${err.message}`);
            } else {
                console.log('MongoDB client connected to the server');
                this.db = this.client.db(database);
            }
        });
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        return this.db.collection('users').countDocuments();
    }

    async nbFiles() {
        return this.db.collection('files').countDocuments();
    }
}

const dbClient = new DBClient();
export default dbClient;