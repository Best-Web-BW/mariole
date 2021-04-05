import { success, error, methodNotAllowed } from "../../../utils/common/network";
import createSecureCookie from "../../../utils/cookies/createSecureCookie";
import connect from "../../../utils/mongo/connect";
import hmacSHA512 from "crypto-js/hmac-sha512";
import { v4 as UUID } from "uuid";

export default async function handler(req, res) {
    switch(req.method) {
        case "POST": return await POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

export async function _post({ login, password }) {
    let admins, admin;
    try {
        const { db } = await connect();
        admins = db.collection("admins");

        admin = await admins.findOne({ login });
        if(!admin) return error("invalid_auth_data")
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    let hashes;
    try {
        const spicedPassword = `${admin.salt}${password}${admin.pepper}`;
        const reversedSpicedPassword = [...spicedPassword].reverse().join("");
        hashes = {
            normal: hmacSHA512(spicedPassword, admin.key).toString(),
            reversed: hmacSHA512(reversedSpicedPassword, admin.key).toString()
        };
    } catch(e) {
        console.error(e);
        return error("sha512_error");
    }

    try {
        const equals = (
            hashes.normal === admin.hashes.normal &&
            hashes.reversed === admin.hashes.reversed
        );
        if(!equals) return error("invalid_auth_data")
    } catch(e) {
        console.error(e);
        return error("internal_error");
    }

    let session;
    try {
        session = {
            uuid: UUID(),
            accessKey: UUID(),
            refreshKey: UUID()
        };
    } catch(e) {
        console.error(e);
        return error("uuid_error");
    }

    let sessions;
    try {
        sessions = admin.sessions.slice(-2);
        sessions.push(session);
    } catch(e) {
        console.error(e);
        return error("internal_error")
    }

    try {
        await admins.updateOne({ login }, { $set: { sessions } });
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    return success({ session });
}

async function POST(req, res) {
    const { login, password } = req.body;
    const result = await _post({ login, password });
    if(result.success) {
        res.status(200);
        res.setHeader("Set-Cookie", [
            createSecureCookie({
                name: "access_key",
                value: result.session.accessKey,
                maxAge: 60 * 5 /* 5 minutes */
            }),
            createSecureCookie({
                name: "refresh_key",
                value: result.session.refreshKey,
                maxAge: 60 * 60 * 24 * 7, /* 7 days */
                path: "/api/auth/refresh"
            }),
            createSecureCookie({
                name: "uuid",
                value: result.session.uuid,
                maxAge: 60 * 60 * 24 * 7 /* 7 days */
            })
        ]);
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