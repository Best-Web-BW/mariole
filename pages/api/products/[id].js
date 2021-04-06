import { success, error, methodNotAllowed } from "../../../utils/common/network";
import leaveOneLocale from "../../../utils/products/leaveOneLocale";
import connect from "../../../utils/mongo/connect";
import { getMaxID } from "../../../utils/mongo/getMaxID";
import { _get as authorize } from "../auth/authorize";
import log from "../../../utils/mongo/log";

export default async function handler(req, res) {
    switch(req.method) {
        case "GET": return await GET(req, res);
        case "POST": return await POST(req, res);
        case "PATCH": return await PATCH(req, res);
        case "DELETE": return await DELETE(req, res);
        default: return methodNotAllowed(req, res, ["GET", "POST", "PATCH", "DELETE"]);
    }
}

export async function _get({ locale = "ru", id = 0, full = false }) {
    let product, linkedProducts;
    try {
        const { db } = await connect();
        const products = db.collection("products");

        product = await products.findOne({ id }, { projection: { _id: 0 } });
        if(!product) return error("no_product");

        linkedProducts = await products.find(
            { space: product.space },
            { projection: { _id: 0, id: 1, color: 1, images: 1 } }
        ).toArray();
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    try {
        const links = linkedProducts.map(({ id, color, images: [image] }) => ({ id, color, image }));
        product.links = links;
    } catch(e) {
        console.error(e);
        return error("internal_error");
    }

    return success({ product: full ? product : leaveOneLocale(product, locale) });
}

async function GET(req, res) {
    const { locale, id, full } = req.query;
    const result = await _get({ locale, id: +id, full });
    if(result.success) res.status(200).json(result.product);
    else switch(result.error) {
        case "no_product":
            res.status(404).end();
            break;
        default:
            res.status(500).end(result.error);
            break;
    }
}

export async function _post({ uuid, accessKey, parent: parentID, ...data }) {
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
        const { db } = await connect();
        const products = db.collection("products");

        const parent = await products.findOne({ id: parentID }, { projection: { _id: 0, space: 1 } });
        if(!parent) return error("no_parent");

        const timestamp = new Date().toISOString();
        data = {
            id: await getMaxID(products) + 1,
            cdate: timestamp,
            mdate: timestamp,
            space: parent.space,
            ...data
        };
        await products.insertOne(data);
        await log(login, "POST, product", data);
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    return success();
}

async function POST(req, res) {
    const { uuid, access_key: accessKey } = req.cookies
    const {
        price, locales: {
            ru: {
                name: ruName,
                description: ruDescription,
                composition: ruComposition,
                details: ruDetails
            },
            en: {
                name: enName,
                description: enDescription,
                composition: enComposition,
                details: enDetails
            }
        }, color, sizes, images,
        category, subcategory,
        limited, bestseller,
        available, parent
    } = req.body;
    const result = await _post({
        uuid, accessKey,
        price, locales: {
            ru: {
                name: ruName,
                description: ruDescription,
                composition: ruComposition,
                details: ruDetails
            },
            en: {
                name: enName,
                description: enDescription,
                composition: enComposition,
                details: enDetails
            }
        }, color, sizes, images,
        category, subcategory,
        limited, bestseller,
        available, parent
    });
    if(result.success) res.status(200).end();
    else switch(result.error) {
        case "auth_error":
            res.status(403).end();
            break;
        default:
            res.status(500).end(result.error);
            break;
    }
}

export async function _patch({ uuid, accessKey, ...data }) {
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
        const { db } = await connect();
        const products = db.collection("products");

        const product = await products.findOne({ id: data.id });
        if(!product) return error("no_product");

        data = {
            ...product,
            ...data,
            mdate: new Date().toISOString()
        };
        await products.updateOne({ _id: product._id }, { $set: data });
        await log(login, "PATCH, product", data);
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    return success();
}

async function PATCH(req, res) {
    const { uuid, access_key: accessKey } = req.cookies;
    const { id } = req.query;
    const {
        price, locales: {
            ru: {
                name: ruName,
                description: ruDescription,
                composition: ruComposition,
                details: ruDetails
            },
            en: {
                name: enName,
                description: enDescription,
                composition: enComposition,
                details: enDetails
            }
        }, color, sizes, images,
        category, subcategory,
        limited, bestseller,
        available
    } = req.body;
    const result = await _patch({
        uuid, accessKey,
        id: +id, price, locales: {
            ru: {
                name: ruName,
                description: ruDescription,
                composition: ruComposition,
                details: ruDetails
            },
            en: {
                name: enName,
                description: enDescription,
                composition: enComposition,
                details: enDetails
            }
        }, color, sizes, images,
        category, subcategory,
        limited, bestseller,
        available
    });
    if(result.success) res.status(200).end();
    else switch(result.error) {
        case "auth_error":
            res.status(403).end();
            break;
        default:
            res.status(500).end(result.error);
            break;
    }
}

export async function _delete({ uuid, accessKey, id }) {
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
        const { db } = await connect();
        const products = db.collection("products");

        const product = await products.findOne({ id });
        if(!product) return error("no_product");

        await products.deleteOne({ _id: product._id });
        await log(login, "DELETE, product", data);
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    return success();
}

async function DELETE(req, res) {
    const { uuid, access_key: accessKey } = req.cookies;
    const { id } = req.query;
    const result = await _delete({ uuid, accessKey, id: +id });
    if(result.success) res.status(200).end();
    else switch(result.error) {
        case "auth_error":
            res.status(403).end();
            break;
        default:
            res.status(500).end(result.error);
            break;
    }
}