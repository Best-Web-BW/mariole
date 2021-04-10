const forceSSL = require("express-force-ssl");
const express = require("express")();
const spdy = require("spdy");
const http = require("http");
const next = require("next");
const path = require("path");
const fs = require("fs");

process.env.DO_LOG = Boolean(process.env.npm_config_do_log);
process.env.NODE_ENV = process.env.npm_config_dev ? "development" : "production";

const dev = process.env.NODE_ENV !== "production";
const nextjs = next({ dev });
const nextHandler = nextjs.getRequestHandler();

const HTTPS_PORT = process.env.HTTPS_PORT ?? 443;
const HTTP_PORT = process.env.HTTP_PORT ?? 80;

(async () => {
    try {
        await nextjs.prepare();

        spdy.createServer({
            cert: fs.readFileSync("ssl/cert.pem"),
            key: fs.readFileSync("ssl/key.pem")
        }, express).listen(HTTPS_PORT);
        http.createServer(express).listen(HTTP_PORT);
        
        express.use((req, res, next) => {
            try { forceSSL(req, res, next) }
            catch(e) { console.error("----> forceSSL error", e, new Error().stack) }
        })
        // express.use(forceSSL);
        
        const dynamicFileHandler = async (req, res, next) => {
            try {
                const filePath = path.join(process.cwd() + decodeURIComponent(req.baseUrl));
                await fs.promises.access(filePath);
                res.sendFile(filePath);
            } catch(e) { next(); }
        }
        express.use("/images/*", async (req, res, next) => {
            try { await dynamicFileHandler(req, res, next) }
            catch(e) { console.error("----> dynamic file handler error", e, new Error().stack) }
        });
        // express.use("/images/*", dynamicFileHandler);
        
        express.all("/api/*", async (req, res, next) => {
            try { await nextHandler(req, res, next) }
            catch(e) { console.error("----> next api error", e, new Error().stack) }
        });
        // express.all("/api/*", nextHandler);

        express.get("*", async (req, res, next) => {
            try { await nextHandler(req, res, next) }
            catch(e) { console.error("----> next main error", e, new Error().stack) }
        })
		// express.get("*", nextHandler);

        console.log(`--> Process environment: '${process.env.NODE_ENV}'`);
        console.log(`--> Is app in development mode: ${dev}`);
        console.log(`-> Ready on port ${HTTP_PORT} for HTTP`);
        console.log(`-> Ready on port ${HTTPS_PORT} for HTTPS`);
	} catch(e) {
		console.error(e.stack);
		process.exit(1);
	}
})();