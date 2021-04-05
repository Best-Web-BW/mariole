import { MongoClient } from "mongodb";

const { DB_URI, DB_NAME } = process.env;
if(!(DB_URI && DB_URI.length)) throw new Error("DB uri is invalid.");
if(!(DB_NAME && DB_NAME.length)) throw new Error("DB name is invalid.");

global.mongo ??= null;

export default async function connect() {
    if(global.mongo) return global.mongo;

    const client = await MongoClient.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    global.mongo = {
        client,
        db: client.db(DB_NAME)
    };
    return global.mongo;
}
