import createSecureCookie from "../../../utils/cookies/createSecureCookie";
import { success, error, methodNotAllowed } from "../../../utils/common/network";
import connect from "../../../utils/mongo/connect";
import { v4 as UUID } from "uuid";

export default async function handler(req, res) {
    switch(req.method) {
        case "GET": return await GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

export async function _get({ uuid, refreshKey }) {
    let admins, admin;
    try {
        const { db } = await connect();
        admins = db.collection("admins");

        admin = await admins.findOne({ sessions: { $elemMatch: { uuid, refreshKey } } });
        if(!admin) return error("invalid_auth_data");
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    let session;
    try {
        session = {
            uuid, refreshKey,
            accessKey: UUID()
        };
    } catch(e) {
        console.error(e);
        return error("uuid_error");
    }

    let sessions;
    try {
        sessions = admin.sessions.filter(session => session.uuid !== uuid);
        sessions.push(session);
    } catch(e) {
        console.error(e);
        return error("internal_error");
    }

    try {
        await admins.updateOne({ _id: admin._id }, { $set: { sessions } });
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    return success({ session });
}

async function GET(req, res) {
    const { uuid, refresh_key: refreshKey } = req.cookies;
    const result = await _get({ uuid, refreshKey });
    if(result.success) {
        res.status(200);
        res.setHeader("Set-Cookie", createSecureCookie({
            name: "access_key",
            value: result.session.accessKey,
            maxAge: 60 * 5 /* 5 minutes */
        }));
        res.end();
    } else switch(result.error) {
        case "invalid_auth_data":
            res.status(403).end();
            break;
        default:
            res.status(500).end(result.error);
            break;
    };
}