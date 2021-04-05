import { success, error, methodNotAllowed } from "../../../utils/common/network";
import leaveOneLocale from "../../../utils/products/leaveOneLocale";
import connect from "../../../utils/mongo/connect";

export default async function handler(req, res) {
    switch(req.method) {
        case "GET": return await GET(req, res);
        case "POST": return POST(req, res);
        case "PATCH": return PATCH(req, res);
        case "DELETE": return DELETE(req, res);
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

export function _post(data) {
    console.log({ action: "_post", data });
    return { success: 1 };
}

function POST(req, res) {
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
        }, color, sizes, /* images, */
        category, subcategory,
        limited, bestseller,
        available, parent
    } = req.body;
    const result = _post({
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
        }, color, sizes, /* images, */
        category, subcategory,
        limited, bestseller,
        available, parent
    });
    res.status(200).json(result);
}

export function _patch(data) {
    console.log({ action: "_patch", data });
    return { success: 1 };
}

function PATCH(req, res) {
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
        }, color, sizes, /* images, */
        category, subcategory,
        limited, bestseller,
        available
    } = req.body;
    const result = _patch({
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
        }, color, sizes, /* images, */
        category, subcategory,
        limited, bestseller,
        available
    });
    res.status(200).json(result);
}

function _delete({ id }) {
    console.log({ action: "_delete", id });
    return { success: 1 };
}

function DELETE(req, res) {
    const { id } = req.query;
    const result = _delete({ id: +id });
    res.status(200).json(result);
}