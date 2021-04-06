import { success, error, methodNotAllowed } from "../../../utils/common/network";
import connect from "../../../utils/mongo/connect";

export default async function handler(req, res) {
    // switch(req.method) {
    //     case "GET": return await GET(req, res);
    /*    default: */ return methodNotAllowed(req, res, [/* "GET" */]);
    // }
}

export async function _get({ uuid, accessKey }) {
    let login;
    try {
        const { db } = await connect();
        const admins = db.collection("admins");

        const admin = await admins.findOne({ sessions: { $elemMatch: { uuid, accessKey } } });
        if(!admin) return error("invalid_auth_data");

        login = admin.login;
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    return success({ login });
}

// async function GET(req, res) {
//     const { uuid, access_key: accessKey } = req.cookies;
//     const result = await _get({ uuid, accessKey });
//     if(result.success) res.status(200).end();
//     else switch(result.error) {
//         case "invalid_auth_data":
//             res.status(403).end();
//             break;
//         default:
//             res.status(500).end(result.error);
//             break;
//     }
// }