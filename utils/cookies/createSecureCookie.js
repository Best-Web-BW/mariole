export default function createSecureCookie({ name, value, maxAge = -1, path = "/" }) {
    return [
        `${name}=${value}`,
        `Max-Age=${maxAge}`,
        `Path=${path}`,
        "Secure",
        "HttpOnly",
        "SameSite=Strict"
    ].join("; ");
}