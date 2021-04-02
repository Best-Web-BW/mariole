import { methodNotAllowed } from "../../../utils/common/network";
import { address, password } from "./data.json";
import nodemailer from "nodemailer";
const mariole = "Mario'le";
const mailer = {
    transporter: nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: { user: address, pass: password },
    }),
    admin: ({ }) => ({
        from: `"${mariole}" <${address}>`,
        to: address,
        subject: `Заказ`,
        html: `
            <div>
                <p>Информация о заказе.</p>
            </div>
        `
    }),
    user: ({ email }) => ({
        from: `"${mariole}" <${address}>`,
        to: email,
        subject: `Заказ`,
        html: `
            <div>
                <p>Информация о заказе.</p>
            </div>
        `
    })
};

export default function handler(req, res) {
    switch(req.method) {
        case "POST": return POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

async function _post({ email }) {
    try {
        const data = { email };
        await Promises.all([
            mailer.transporter.sendMail(mailer.admin(data)),
            mailer.transporter.sendMail(mailer.user(data))
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