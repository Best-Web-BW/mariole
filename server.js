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
        
        const handleImage = async (req, res, next) => {
            try {
                const parsedUrl = req.baseUrl.split("/").slice(1); // split and remove first empty
                const parsedPath = parsedUrl.slice(0, -1); // get only path
                const filename = parsedUrl.slice(-1)[0]; // get only file name
                
                const extension = req.headers.accept.includes("image/webp") ? "webp" : "jpg";
                const relativePath = path.join(...[...parsedPath, extension, `${filename}.${extension}`]);
                const fullDynamicPath = path.join(process.cwd(), relativePath);
                const fullStaticPath = path.join(process.cwd(), "public", relativePath);

                try {
                    await fs.promises.access(fullDynamicPath);
                    return res.sendFile(fullDynamicPath);
                } catch(e) {}

                try {
                    await fs.promises.access(fullStaticPath);
                    return res.sendFile(fullStaticPath);
                } catch(e) {}

                throw new Error();
            } catch(e) { next(); }
        }
        express.use("/images/*", async (req, res, next) => {
            try { await handleImage(req, res, next) }
            catch(e) { console.error("----> image handler error", e, new Error().stack) }
        });
        // express.use("/images/*", handleImage);
        
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