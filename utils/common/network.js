export function methodNotAllowed(req, res, allowedMethods = ["GET", "POST", "DELETE"]) {
    res.setHeader("Allow", allowedMethods);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}

export function joinQuery(params) {
    const entries = [];
    for(const key in params) {
        const value = params[key];
        if(!value) continue;

        if(typeof value === "boolean") entries.push(`${key}=1`);
        else if(value instanceof Array) {
            if(value.length) entries.push(`${key}=${encodeURIComponent(value.toString())}`);
        } else entries.push(`${key}=${encodeURIComponent(value)}`);
    }
    return `${entries.join("&")}`;
}