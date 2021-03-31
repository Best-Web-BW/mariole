const forceSSL = require("express-force-ssl");
const express = require("express")();
const http = require("http");
const next = require("next");
const fs = require("fs");

const spdy = require("spdy");

process.env.DO_LOG = Boolean(process.env.npm_config_do_log);
process.env.NODE_ENV = process.env.npm_config_dev ? "development" : "production";

const dev = process.env.NODE_ENV !== "production";
const nextjs = next({ dev });
const nextHandler = nextjs.getRequestHandler();

const HTTPS_PORT = process.env.HTTPS_PORT ?? 443;
const HTTP_PORT = process.env.HTTP_PORT ?? 80;

const seo = require("./routes/seo.js");
// const api = require("./routes/api.js");

(async () => {
    try {
        await nextjs.prepare();

        spdy.createServer({
            cert: fs.readFileSync("ssl/cert.pem"),
            key: fs.readFileSync("ssl/key.pem")
        }, express).listen(HTTPS_PORT);
        http.createServer(express).listen(HTTP_PORT);
        express.use(forceSSL);
        
        // const dynamicFileHandler = (req, res) => res.sendFile(__dirname + path.normalize(decodeURI(req.path)));
        // express.post("/documents/*", dynamicFileHandler);
        // express.get("/documents/*", dynamicFileHandler);
        // express.post("/images/*", dynamicFileHandler);
        // express.get("/images/*", dynamicFileHandler);

        express.use("/sitemap.xml", seo.sitemap);
        express.use("/robots.txt", seo.robots);
		// express.use("/api", api);
        
        express.all("/api/*", nextHandler);
		express.get("*", nextHandler);

        console.log(`--> Process environment: '${process.env.NODE_ENV}'`);
        console.log(`--> Is app in development mode: ${dev}`);
        console.log(`-> Ready on port ${HTTP_PORT} for HTTP`);
        console.log(`-> Ready on port ${HTTPS_PORT} for HTTPS`);
	} catch(e) {
		console.error(e.stack);
		process.exit(1);
	}
})();