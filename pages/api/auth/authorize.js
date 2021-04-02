import { methodNotAllowed } from "../../../utils/common/network";
import admins from "./admins.json";

export default async function handler(req, res) {
    switch(req.method) {
        case "GET": return GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

export function _get({ uuid, accessKey }) {
    const admin = admins.find(admin => admin.sessions.find(session => {
        return session.uuid === uuid && session.accessKey === accessKey;
    }));
    return { success: admin ? 1 : 0 };
}

function GET(req, res) {
    const { uuid, access_key: accessKey } = req.cookies;
    const result = _get({ uuid, accessKey });
    res.status(result.success ? 200 : 403).end();
}