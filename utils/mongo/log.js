import connect from "./connect";

export default async function log(login, action, data) {
    try {
        const { db } = await connect();
        const logs = db.collection("logs");

        const timestamp = new Date().toISOString();
        await logs.insertOne({ timestamp, login, action, data });
    } catch(e) {
        console.error(e);
        console.error("!----- LOG ERROR -----!");
    }
}