import { success, error, methodNotAllowed } from "../../../utils/common/network";
import connect from "../../../utils/mongo/connect";

export default async function handler(req, res) {
    switch(req.method) {
        case "GET": return await GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

function cut({ id, locales: { ru: { name } } }) {
    return { id, name };
}

export async function _get() {
    let parents;
    try {
        const { db } = await connect();
        const products = db.collection("products");
        
        parents = await products.find({ }, { projection: { _id: 0, id: 1, locales: 1 } }).toArray();
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    return success({ parents: parents.map(cut) });
}

async function GET(_, res) {
    const result = await _get();
    if(result.success) res.status(200).json(result.parents);
    else switch(result.error) {
        default:
            res.status(500).end(result.error);
            break;
    }
}