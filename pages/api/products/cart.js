// import leaveOneLocale from "../../../utils/products/leaveOneLocale";
import { methodNotAllowed } from "../../../utils/common/network";
import products from "./products.json";

export default function handler(req, res) {
    switch(req.method) {
        case "GET": return GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

function cut({ id, price, images: [image], locales, color, available }, locale) {
    return { id, price, image, name: locales[locale].name, color, available };
}

export function _get({ locale = "ru", ids = [] }) {
    return (
        products
            .filter(product => ids.includes(product.id))
            .map(product => cut(product, locale))
    );
}

function GET(req, res) {
    const { locale } = req.query;
    const ids = req.query.ids?.split(",").map(id => id ? +id : undefined);
    const products = _get({ locale, ids });
    res.status(200).json(products);
}