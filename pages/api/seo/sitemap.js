import connect from "../../../utils/mongo/connect";
import { promises as fs } from "fs";
import path from "path";

const STATIC_PRIORITY = 0.6;
const DYNAMIC_PRIORITY = 0.7;
const SUBDYNAMIC_PRIORITY = 0.75;
const HOMEPAGE_PRIORITY = 0.8;
const { PROTOCOL, DOMAIN } = process.env;
export default async function handler(_, res) {
    res.status(200);
    res.setHeader("Content-Type", "application/xml");
    res.write('<?xml version="1.0" encoding="UTF-8"?>');
    res.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    for(const { loc, lastmod, priority } of await getFull()) res.write(`
        <url>
            <loc>${PROTOCOL}://${DOMAIN}/${loc}</loc>
            <lastmod>${lastmod}</lastmod>
            <priority>${priority}</priority>
        </url>
    `);

    res.write("</urlset>");
    res.end();
}

const getFull = async () => [...await getStaticPart(), ...await getDynamicPart()];

const getURLObject = (loc, lastmod, priority) => ({ loc, lastmod, priority });

async function getStaticPart() {
    const pages = [
        "contacts", "media",
        "payment", "privacy-policy",
        "return-and-exchange",
        "shipping", "size-table"
    ];

    return await Promise.all(pages.map(async page => {
        const filename = path.normalize(`${process.cwd()}/pages/${page}/index.js`);
        const mtime = (await fs.stat(filename)).mtime.toISOString();
        return getURLObject(page, mtime, STATIC_PRIORITY);
    }));
}

async function getDatas(collection) {
    let datas = [];
    try {
        datas = await collection.find({}, { projection: { _id: 0, id: 1, mdate: 1 } }).toArray();
    } catch(e) {
        console.error(e);
    }

    return datas;
}

async function getDynamicDatas() {
    let products = [];
    try {
        const { db } = await connect();
        products = await getDatas(db.collection("products"));
    } catch(e) {
        console.error(e);
    }

    return { products };
}

function listToXML(list, name) {
    let lastModifyDate = new Date("1970-01-01").toISOString();
    const listToAdd = list.map(({ id, mdate }) => {
        if(mdate > lastModifyDate) lastModifyDate = mdate;
        return getURLObject(`${name}/${id}`, mdate, SUBDYNAMIC_PRIORITY);
    });

    return [lastModifyDate, listToAdd];
}

async function getDynamicPart() {
    const xmled = [];
    
    const { products } = await getDynamicDatas();
    
    const [lastProductModifyDate, productListToAdd] = listToXML(products, "shop");
    xmled.push(getURLObject("", lastProductModifyDate, HOMEPAGE_PRIORITY));
    xmled.push(getURLObject("shop", lastProductModifyDate, DYNAMIC_PRIORITY), ...productListToAdd);

    return xmled;
};
