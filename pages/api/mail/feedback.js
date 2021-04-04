import { methodNotAllowed } from "../../../utils/common/network";
import { address, password } from "./data.json";
import nodemailer from "nodemailer";

export default function handler(req, res) {
    switch(req.method) {
        case "POST": return POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

const mariole = "Mario’le";
const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: { user: address, pass: password }
});

const makeMessage = ({ name, email, phone, message }) => ({
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
});

async function _post({ name, email, phone, message }) {
    try {
        const data = { name, email, phone, message };
        const mail = makeMessage(data);
        console.log("Send feedback email", { mail });
        // await transporter.sendMail(makeMessage(data));
        return { success: 1 };
    } catch(e) {
        console.error(e);
        return { success: 0 };
    }
}

async function POST(req, res) {
    const { name, email, phone, message } = req.body;
    const result = await _post({ name, email, phone, message });
    res.status(result.success ? 200 : 400).end();
}