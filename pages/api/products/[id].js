import leaveOneLocale from "../../../utils/products/leaveOneLocale";
import { methodNotAllowed } from "../../../utils/common/network";
import products from "./products.json";

export default function handler(req, res) {
    switch(req.method) {
        case "GET": return GET(req, res);
        case "POST": return POST(req, res);
        case "DELETE": return DELETE(req, res);
        default: return methodNotAllowed(req, res);
    }
}

export function _get({ locale = "ru", id = 0 }) {
    const product = products.find(entry => entry.id === id);
    if(product) {
        const linkedProducts = products.filter(({ space }) => space === product.space);
        product.links = linkedProducts.map(({ id, color, images: [image] }) => ({ id, color, image }));
        return leaveOneLocale(product, locale);
    } else return product;
}

function GET(req, res) {
    const { locale, id } = req.query;
    const product = _get({ locale, id: +id });
    if(product) res.status(200).json(product);
    else res.status(404).end();
}

function POST(req, res) {
    res.status(200).end("post");
}

function DELETE(req, res) {
    res.status(200).end("delete");
}