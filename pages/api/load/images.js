import { methodNotAllowed } from "../../../utils/common/network";
import { cwebp } from "webp-converter";
import formidable from "formidable";
import { v4 as UUID } from "uuid";
import path from "path";
import fs from "fs";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
    switch(req.method) {
        case "POST": return await POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

const basePath = path.normalize(`${process.cwd()}/images/`);
const getTypedPath = type => path.normalize(`${basePath}/${type}/`);
const getTmpPath = type => path.normalize(`${getTypedPath(type)}/tmp/`);
const getRawPath = (type, name) => path.normalize(`${getTmpPath(type)}/${name}`);
const getWebpPath = (type, name) => path.normalize(`${getTypedPath(type)}/webp/${name}`);
const getWebpUrl = (type, name) => `/images/${type}/webp/${name}`;

export async function _post({ type, images }) {
    try {
        const serverImages = [];
        for(const rawImage of images) {
            const { name: rawName, ext: rawExt } = path.parse(rawImage.path);
            const rawPath = getRawPath(type, rawName + rawExt);
    
            const webpName = `${UUID()}.webp`;
            const webpPath = getWebpPath(type, webpName);
            await cwebp(rawPath, webpPath, "-quiet -mt");
            
            const webpUrl = getWebpUrl(type, webpName);

            fs.promises.unlink(rawPath);
            serverImages.push({ url: webpUrl, name: webpName });
        }
        return { success: 1, images: serverImages };
    } catch(e) {
        console.error(e);
        return { success: 0, error: e };
    }
}

function POST(req, res) {
    const { type } = req.query;
    return new Promise(resolve => {
        formidable({
            uploadDir: getTmpPath(type),
            keepExtensions: true,
            multiples: true
        }).parse(req, async (_err, _fields, files) => {
            const images = files.images instanceof Array ? files.images : [files.images];
            res.status(200).json(await _post({ type, images }));
            resolve();
        });
    });
}