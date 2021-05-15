import { success, error, methodNotAllowed } from "../../../utils/common/network";
import connect from "../../../utils/mongo/connect";

export default async function handler(req, res) {
    switch(req.method) {
        case "GET": return await GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

export async function _get({ ids = [] }) {
    let foundProducts;
    try {
        const { db } = await connect();
        const products = db.collection("products");

        foundProducts = await products.find(
            { id: { $in: ids } },
            { projection: { id: 1 } }
        ).toArray();
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    let found, notFound;
    try {
        found = foundProducts.map(({ id }) => id);
        notFound = ids.filter(id => !found.includes(id));
    } catch(e) {
        console.error(e);
        return error("internal_error");
    }

    return success({ found, notFound });
}

async function GET(req, res) {
    const ids = req.query.ids?.split(",").map(id => id ? +id : undefined);
    const result = await _get({ ids });
    if(result.success) {
        if(result.notFound.length === 0) res.status(200).end();
        else if(result.found.length === 0) res.status(204).end();
        else res.status(206).json(result.notFound);
    } else switch(result.error) {
        default:
            res.status(500).end(result.error);
            break;
    }
}