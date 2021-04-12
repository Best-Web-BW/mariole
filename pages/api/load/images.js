import { error, methodNotAllowed, success } from "../../../utils/common/network";
import { _get as authorize } from "../auth/authorize";
import log from "../../../utils/mongo/log";
import { promises as fs } from "fs";
import formidable from "formidable";
import { v4 as UUID } from "uuid";
import path from "path";

import sharp from "sharp";
sharp.cache(false);

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
const getJpgPath = (type, name) => path.normalize(`${getTypedPath(type)}/jpg/${name}.jpg`);
const getWebpPath = (type, name) => path.normalize(`${getTypedPath(type)}/webp/${name}.webp`);
const getUrl = (type, name) => `/images/${type}/${name}`;

async function processImage(rawImage, type) {
    const { name: rawName, ext: rawExt } = path.parse(rawImage.path);
    const rawPath = getRawPath(type, rawName + rawExt);
    
    const name = UUID();
    const imageResource = sharp(rawPath);

    await imageResource.toFile(getJpgPath(type, name));
    await imageResource.toFile(getWebpPath(type, name));

    await fs.unlink(rawPath);
    return { url: getUrl(type, name), name };
}

export async function _post({ uuid, accessKey, type, images }) {
    let login;
    try {
        const authorization = await authorize({ uuid, accessKey });
        if(authorization.success) login = authorization.login;
        else return error("auth_error");
    } catch(e) {
        console.error(e);
        return error("internal_error");
    }

    try {
        const serverImages = await Promise.all(images.map(raw => processImage(raw, type)));
        await log(login, "LOAD, images", { images: serverImages });
        return success({ images: serverImages });
    } catch(e) {
        console.error(e);
        return error("internal_error");
    }
}

function POST(req, res) {
    const { uuid, access_key: accessKey } = req.cookies;
    const { type } = req.query;
    return new Promise(resolve => {
        formidable({
            uploadDir: getTmpPath(type),
            keepExtensions: true,
            multiples: true
        }).parse(req, async (_err, _fields, files) => {
            const images = files.images instanceof Array ? files.images : [files.images];
            const result = await _post({ uuid, accessKey, type, images })
            if(result.success) res.status(200).json(result);
            else switch(result.error) {
                default:
                    res.status(500).end(result.error);
                    break;
            }
            resolve();
        });
    });
}