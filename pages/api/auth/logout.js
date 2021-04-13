import { success, error, methodNotAllowed } from "../../../utils/common/network";
import createSecureCookie from "../../../utils/cookies/createSecureCookie";
import connect from "../../../utils/mongo/connect";

export default async function handler(req, res) {
    switch(req.method) {
        case "GET": return await GET(req, res);
        default: return methodNotAllowed(req, res, ["GET"]);
    }
}

export async function _get({ uuid, accessKey }) {
    let admins, admin;
    try {
        const { db } = await connect();
        admins = db.collection("admins");

        admin = await admins.findOne({ sessions: { $elemMatch: { uuid, accessKey } } });
        if(!admin) return error("invalid_auth_data");
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    let sessions;
    try {
        sessions = admin.sessions.filter(session => session.uuid !== uuid);
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

    return success();
}

async function GET(req, res) {
    const { uuid, access_key: accessKey } = req.cookies;
    const result = await _get({ uuid, accessKey });

    res.status(result.success ? 200 : (res.error === "invalid_auth_data" ? 403 : 500));
    res.setHeader("Set-Cookie", [
        createSecureCookie({ name: "access_key", value: "", maxAge: -1 }),
        createSecureCookie({ name: "refresh_key", value: "", maxAge: -1, path: "/api/auth/refresh" }),
        createSecureCookie({ name: "uuid", value: "", maxAge: -1 })
    ]);
    res.end(result.error);
}