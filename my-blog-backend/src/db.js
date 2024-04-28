// our db connection
import { MongoClient } from 'mongodb';

let db;

async function connectToDb(cb) {
    // connecting MongoDB cloud Atlas 
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.bvy84rm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    await client.connect();
    db = client.db('react-blog-db');
    cb();
}

export {
    db,
    connectToDb,
};