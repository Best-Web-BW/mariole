import { methodNotAllowed } from "../../../utils/common/network";
import { address, password } from "./data.json";
import nodemailer from "nodemailer";
const mariole = "Mario'le";

export default function handler(req, res) {
    switch(req.method) {
        case "POST": return POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: { user: address, pass: password }
});

function makeAdminMessage({ }) {
    return {
        from: `"${mariole}" <${address}>`,
        to: address,
        subject: `Заказ`,
        html: `
            <div>
                <p>Информация о заказе.</p>
            </div>
        `
    };
}

function makeUserMessage({ email }) {
    return {
        from: `"${mariole}" <${address}>`,
        to: email,
        subject: `Заказ`,
        html: `
            <div>
                <p>Информация о заказе.</p>
            </div>
        `
    };
}

async function _post({ email }) {
    try {
        const data = { email };
        await Promises.all([
            transporter.sendMail(makeAdminMessage(data)),
            transporter.sendMail(makeUserMessage(data))
        ]);
        return { success: 1 };
    } catch(e) {
        console.error(e);
        return { success: 0 };
    }
}

async function POST(req, res) {
    const { email } = req.body;
    const result = await _post({ email });
    res.status(result.success ? 200 : 400).end();
}