export default function deleteFalsyValues(obj, isFast = false) {
    return isFast ? fast(obj) : slow(obj);
}

function fast(obj) {
    const result = {};
    for(const key in obj) {
        const value = obj[key];
        if(value) {
            if(typeof value === "object") result[key] = f(value);
            else result[key] = value;
        }
    }
    return result;
}

function slow(obj) {
    return JSON.parse(JSON.stringify(obj));
}