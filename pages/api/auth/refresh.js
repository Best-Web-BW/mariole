import createSecureCookie from "../../../utils/cookies/createSecureCookie";
import { methodNotAllowed } from "../../../utils/common/network";
import admins from "./admins.json";
import { v4 as UUID } from "uuid";

export default async function handler(req, res) {
    switch(req.method) {
        case "GET": return GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

export function _get({ uuid, refreshKey }) {
    const admin = admins.find(admin => admin.sessions.find(session => {
        return session.uuid === uuid && session.refreshKey === refreshKey;
    }));
    
    if(admin) {
        const filteredSessions = admin.sessions.filter(session => session.uuid !== uuid);
        const session = {
            uuid, refreshKey,
            accessKey: UUID(),
        };
        admin.sessions = [...filteredSessions, session];
        return { success: 1, session };
    } else return { success: 0 };
}

function GET(req, res) {
    const { uuid, refresh_key: refreshKey } = req.cookies;
    const result = _get({ uuid, refreshKey });
    if(result.success) {
        res.status(200);
        res.setHeader("Set-Cookie", createSecureCookie({
            name: "access_key",
            value: result.session.accessKey,
            maxAge: 60 * 5 /* 5 minutes */
        }));
    } else res.status(403);
    res.end();
}