export default function f(rawDate = "1970-01-01") {
    return new Date(rawDate).toLocaleString("ru", { day: "numeric", month: "numeric", year: "numeric" });
};