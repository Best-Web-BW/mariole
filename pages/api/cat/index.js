import path from "path";

export default function handler(_, res) {
    res.status(200).sendFile(path.join(process.cwd() + "/pages/api/cat/cat.html"));
}