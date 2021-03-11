const router = require("express").Router();
const path = require("path");

// new require("mongodb").MongoClient("mongodb://localhost:27017", { useUnifiedTopology: true, useNewUrlParser: true }).connect((err, client) => {
//     if(err) return console.error(err);
    
//     const db = client.db("mydistrict");
// });

router.get("/", (_, res) => {
	res.end("Hello world! index");
});

router.get("/cat", (_, res) => {
    res.sendFile(path.join(__dirname + "/cat.html"));
});

module.exports = router;