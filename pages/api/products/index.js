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

function createQuery({ ids, category, subcategory, limited, bestseller, sizes, search }) {
    const result = {};
    if(        ids && ids instanceof Array           ) result.id = { $in: ids };
    if(      sizes && sizes instanceof Array         ) result.sizes = { $elemMatch: { $in: sizes } };
    if(    limited && typeof limited === "boolean"   ) result.limited = true;
    if( bestseller && typeof bestseller === "boolean") result.bestseller = true;
    if(   category && typeof category === "string"   ) result.category = category;
    if(subcategory && typeof subcategory === "string") result.subcategory = subcategory;
    if(     search && typeof search === "string"     ) {
        result.$or = [
            { "locales.ru.name": { $regex: search, $options: "gi" } },
            { "locales.en.name": { $regex: search, $options: "gi" } }
        ]
    }
    return result;
}

export async function _get({ locale = "ru", ...params }) {
    let matchedProducts;
    try {
        const { db } = await connect();
        const products = db.collection("products");
        
        const query = createQuery(params);
        const projection = { _id: 0, id: 1, price: 1, images: 1, locales: 1, available: 1, color: 1 };
        matchedProducts = await products.find(query, { projection }).toArray();
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
    const { locale, category, subcategory } = req.query;
    const    limited = req.query.limited === "1";
    const bestseller = req.query.bestseller === "1";
    const        ids = req.query.ids?.split(",").map(id => id ? +id : undefined);
    const      sizes = req.query.sizes?.split(",");
    const     search = decodeURIComponent(req.query.search ?? "");

    const result = await _get({ locale, ids, category, subcategory, limited, bestseller, sizes, search });
    if(result.success) res.status(200).json(result.products);
    else switch(result.error) {
        default:
            res.status(500).end(result.error);
            break;
    }
}