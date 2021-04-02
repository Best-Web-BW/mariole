import createSecureCookie from "../../../utils/cookies/createSecureCookie";
import { methodNotAllowed } from "../../../utils/common/network";
import hmacSHA512 from "crypto-js/hmac-sha512";
import admins from "./admins.json";
import { v4 as UUID } from "uuid";

export default async function handler(req, res) {
    switch(req.method) {
        case "POST": return POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

export function _post({ login, password }) {
    const admin = admins.find(admin => admin.login === login);
    const spicedPassword = `${admin.salt}${password}${admin.pepper}`;
    const hashes = {
        normal: hmacSHA512(spicedPassword, admin.key).toString(),
        reversed: hmacSHA512(Array.from(spicedPassword).reverse().join(""), admin.key).toString()
    }
    const equals = (hashes.normal === admin.hashes.normal && hashes.reversed === admin.hashes.reversed);
    
    if(equals) {
        const session = {
            uuid: UUID(),
            accessKey: UUID(),
            refreshKey: UUID()
        };
        admin.sessions = [...admin.sessions.slice(-2), session];
        return { success: 1, session };
    } else return { success: 0 };
}

function POST(req, res) {
    const { login, password } = req.body;
    const result = _post({ login, password });
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
    } else res.status(403);
    res.end();
}