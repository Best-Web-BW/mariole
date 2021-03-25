import findArrrayIntersection from "../../../utils/arrays/findIntersection";
import { methodNotAllowed } from "../../../utils/common/network";
import products from "./products.json";

export default function handler(req, res) {
    switch(req.method) {
        case "GET": return GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

function findInLocalesName(locales, text) {
    for(const localeId in locales) {
        const { name } = locales[localeId];
        if(name.toLowerCase().includes(text.toLowerCase())) return true;
    }
    return false;
}

function matchesRequest(product, { ids, category, subcategory, limited, bestseller, sizes, search }) {
    return !Boolean(
        (ids && !ids.includes(product.id)) ||
        (category && product.category !== category) ||
        (subcategory && product.subcategory !== subcategory) ||
        (+limited === 1 && !product.limited) ||
        (+bestseller === 1 && !product.bestseller) ||
        (sizes && findArrrayIntersection(sizes, product.sizes).length === 0) ||
        (search && !findInLocalesName(product.locales, search))
    );
}

function cut({ id, price, images: [image], locales, available }, locale) {
    return { id, price, image, name: locales[locale].name, available };
}

export function _get({ locale = "ru", ...params }) {
    return (
        products
            .filter(product => matchesRequest(product, params))
            .map(product => cut(product, locale))
    );
}

function GET(req, res) {
    const { locale, category, subcategory, limited, bestseller } = req.query;
    const ids = req.query.ids?.split(",").map(id => id ? +id : undefined);
    const sizes = req.query.sizes?.split(",");
    const search = decodeURIComponent(req.query.search ?? "");
    const products = _get({ locale, ids, category, subcategory, limited, bestseller, sizes, search });
    res.status(200).json(products);
}