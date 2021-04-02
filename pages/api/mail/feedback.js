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
    admin: ({ name, email, phone, message }) => ({
        from: `"${mariole}" <${address}>`,
        to: address,
        subject: `Обратная связь`,
        html: `
            <div>
                <h2>Контактная информация</h2>
                <p>Имя: <b>${name}</b></p>
                <br />
                <p>Email: <b>${email}</b></p>
                <br />
                <p>Номер телефона: <b>${phone}</b></p>
                <br />
                <p>Вопрос:</p>
                <p>${message}</p>
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

async function _post({ name, email, phone, question }) {
    try {
        const data = { name, email, phone, question };
        await mailer.transporter.sendMail(mailer.admin(data));
        return { success: 1 };
    } catch(e) {
        console.error(e);
        return { success: 0 };
    }
}

async function POST(req, res) {
    const { name, email, phone, question } = req.body;
    const result = await _post({ name, email, phone, question });
    res.status(result.success ? 200 : 400).end();
}