import { success, error, methodNotAllowed } from "../../../utils/common/network";
import connect from "../../../utils/mongo/connect";

export default async function handler(req, res) {
    switch(req.method) {
        case "GET": return await GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

function cut({ images: [image], locales, ...product }, locale) {
    return { image, name: locales[locale].name, ...product };
}

export async function _get({ locale = "ru", ids = [] }) {
    let matchedProducts;
    try {
        const { db } = await connect();
        const products = db.collection("products");

        matchedProducts = await products.find(
            { id: { $in: ids } },
            { projection: { _id: 0, id: 1, price: 1, images: 1, locales: 1, color: 1, available: 1 } }
        ).toArray();
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    try {
        matchedProducts = matchedProducts.map(product => cut(product, locale));
    } catch(e) {
        console.error(e);
        return error("internal_error");
    }

    return success({ products: matchedProducts });
}

async function GET(req, res) {
    const { locale } = req.query;
    const ids = req.query.ids?.split(",").map(id => id ? +id : undefined);
    const result = await _get({ locale, ids });
    if(result.success) res.status(200).json(result.products);
    else switch(result.error) {
        default:
            res.status(500).end(result.error);
            break;
    }
}