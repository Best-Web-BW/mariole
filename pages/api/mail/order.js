import { methodNotAllowed } from "../../../utils/common/network";
import { address, password } from "./data.json";
import nodemailer from "nodemailer";

export default function handler(req, res) {
    switch(req.method) {
        case "POST": return POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

const mariole = "Mario’le Shop";
const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: { user: address, pass: password }
});

const toAdminCartEntry = ({ href, name, color, size, quantity, price }) => (`
    <li>
        <p>
            <span><a href="${href}">${name}</a></span>
            <span>${color}</span>
            <span>${size}</span>
            <span>${quantity}</span>
            <span>${price}</span>
        </p>
    </li>
`);

const makeAdminMessage = ({ id, name, phone, email, shippingAddress, cart, payment, totalPrice, shippingPrice }) => ({
    from: `"${mariole}" <${address}>`,
    to: address,
    subject: `Заказ`,
    html: `
        <div>
            <p>Информация о заказе №<span>${id}</span></p>
            <p>Заказчик: <b>${name}</b></p>
            <p>Телефон: <b>${phone}</b></p>
            <p>Email: <b>${email}</b></p>
            <p>Адрес доставки: <span><i>${shippingAddress}</i></span></p>
            <br/>
            <p>Товары в заказе:</p>
            <ul>${cart.map(toAdminCartEntry).join("")}</ul>
            <br/>
            <p>Метод оплаты: <span>${payment}</span></p>
            <p>Заказ на сумму: <b>${totalPrice}</b></p>
            <p>Включая доставку: <b>${shippingPrice}</b></p>
        </div>
    `
});

const userStyles = {
    row: "display: block;",
    wrapper: `
        border-bottom: 1px solid #cfcfcf;
        display: flex; flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    `,
    image: "width: 20%; position: relative;",
    quantity: `
        position: absolute; top: 0; right: 0;
        background-color: #cfcfcf;
        border-radius: 50%; height: 20px;
        width: 20px; font-size: 16px;
        display: flex; flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    `,
    name: `
        width: calc(40% - 20px);
        padding-left: 20px;
        font-size: 16px;
    `,
    price: `
        width: 40%; display: flex;
        flex-wrap: nowrap;
        justify-content: flex-end;
        font-size: 16px;
    `
}

const toUserCartEntry = ({ image, quantity, name, color, price }) => (`
    <div style="${userStyles.row}">
        <div style="${userStyles.wrapper}">
            <div style="${userStyles.image}">
                <img src=${image} alt="" width="100%" />
                <div style="${userStyles.quantity}">${quantity}</div>
            </div>
            <div style="${userStyles.name}">${name} / ${color}</div>
            <div style="${userStyles.price}">${formatPrice(price)} &#8381;</div>
        </div>
    </div>
`);

const makeUserMessage = ({ email, totalPrice, shippingPrice, payment, shippingAddress, name, cart }) => ({
    from: `"${mariole}" <${address}>`,
    to: email,
    subject: `Успешное оформление заказа`,
    html: `
        <div>
            <h2>Спасибо за Ваш заказ!</h2>
            <br />
            <p>Далее Вы можете ознакомиться с детальной информацией.</p>
            <br />
            <p>Сумма вашего заказа: <b>${totalPrice}</b></p>
            <p>Включая доставку: <b>${shippingPrice}</b></p>
            <p>Метод оплаты: <b>${payment}</b></p>
            <p>Доставить по адресу: <span>${shippingAddress}</span></p>
            <p>Заказчик: <b>${name}</b></p>
            <br />
            <p>Ваш заказ:</p>
            ${cart.map(toUserCartEntry).join("")}
        </div>
    `
});

async function _post({ id, name, phone, email, cart, payment, shippingAddress, shippingPrice, totalPrice }) {
    try {
        const adminData = { id, name, phone, email, cart, payment, shippingAddress, shippingPrice, totalPrice };
        const userData = { name, email, cart, payment, shippingAddress, shippingPrice, totalPrice };
        await Promises.all([
            transporter.sendMail(makeAdminMessage(adminData)),
            transporter.sendMail(makeUserMessage(userData))
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