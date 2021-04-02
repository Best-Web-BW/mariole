import { methodNotAllowed } from "../../../utils/common/network";
import products from "./products.json";

export default function handler(req, res) {
    switch(req.method) {
        case "GET": return GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

function cut({ id, locales: { ru: { name } } }) {
    return { id, name };
}

export function _get() {
    return products.map(cut);
}

function GET(_, res) {
    const products = _get();
    res.status(200).json(products);
}