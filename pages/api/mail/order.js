import { methodNotAllowed } from "../../../utils/common/network";
import formatPrice from "../../../utils/common/formatPrice";
import { _get as getCartProducts } from "../products/cart";
import nodemailer from "nodemailer";

import ruCommon from "../../../public/locales/ru/api_mail_order.json";
import ruColors from "../../../public/locales/ru/common_colors.json";
import enCommon from "../../../public/locales/en/api_mail_order.json";
import enColors from "../../../public/locales/en/common_colors.json";
const t = {
    ru: { ...ruCommon, colors: ruColors },
    en: { ...enCommon, colors: enColors }
}

export default function handler(req, res) {
    // switch(req.method) {
    //     case "POST": return POST(req, res);
        /* default: */ return methodNotAllowed(req, res, [/* "POST" */]);
    // }
}

const mariole = "Mario’le Shop";
const { MAIL_ADDRESS: address, MAIL_PASSWORD: password } = process.env;
const transporter = nodemailer.createTransport({
    service: "Yandex",
    secure: true,
    auth: {
        user: address,
        pass: password
    }
});

const toAdminCartEntry = ({ href, name, color, size, quantity, price }) => (`
    <li>
        <p>
            <span><a href="${href}">${name}</a></span>,
            &nbsp;<span>${t.ru.colors[color]}</span>,
            &nbsp;<span>${size}</span>,
            &nbsp;<span>${quantity}</span>,
            &nbsp;<span>${formatPrice(quantity * price)} &#8381;</span>
        </p>
    </li>
`);

const makeAdminMessage = ({
    id, name, phone, email,
    cart, payment,
    shipping, totalPrice,
    onlyEmail, subscribe
}) => ({
    from: `"${mariole}" <${address}>`,
    to: address,
    subject: `Заказ`,
    html: `
        <div>
            <p>Информация о заказе №<span>${id}</span></p>
            <p>Заказчик: <b>${name.first} ${name.last}</b></p>
            <p>Телефон: <b>${phone}</b></p>
            <p>Email: <b>${email}</b></p>
            <p>Способ доставки: <span><i>${t.ru.shipping[shipping.type]}</i></span></p>
            <p>Адрес доставки: <span><i>${shipping.address}</i></span></p>
            <br />
            <p>Товары в заказе:</p>
            <ul>${cart.map(toAdminCartEntry).join("")}</ul>
            <br />
            <p>Метод оплаты: <span>${t.ru.payment[payment]}</span></p>
            <p>Заказ на сумму: <b>${formatPrice(totalPrice)} &#8381;</b></p>
            <p>Включая доставку: <b>${formatPrice(shipping.price)} &#8381;</b></p>
            <br />
            <p>Только электронная почта: <b>${onlyEmail ? "Да" : "Нет"}</b></p>
            <p>Подписался на новости: <b>${subscribe ? "Да" : "Нет"}</b></p>
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

// const userStyles = {};

const toUserCartEntry = ({ image, quantity, name, color, price }) => (`
    <div style="${userStyles.row}">
        <div style="${userStyles.wrapper}">
            <div style="${userStyles.image}">
                <img src="${image}" alt="" width="100%" />
                <div style="${userStyles.quantity}">${quantity}</div>
            </div>
            <div style="${userStyles.name}">${name} / ${color}</div>
            <div style="${userStyles.price}">${formatPrice(quantity * price)} &#8381;</div>
        </div>
    </div>
`);

const makeUserMessage = (locale, {
    name, email,
    cart, payment,
    shipping, totalPrice
}) => ({
    from: `"${mariole}" <${address}>`,
    to: email,
    subject: t[locale].email.subject,
    html: `
        <div>
            <h2>${t[locale].email.html.header}</h2>
            <br />
            <p>${t[locale].email.html["next-info"]}</p>
            <br />
            <p>${t[locale].email.html["total-price"]} <b>${formatPrice(totalPrice)} &#8381;</b></p>
            <p>${t[locale].email.html["shipping-cost"]} <b>${formatPrice(shipping.price)} &#8381;</b></p>
            <p>${t[locale].email.html["payment-method"]} <b>${t[locale].payment[payment]}</b></p>
            <p>${t[locale].email.html["delivery-method"]} <span>${t[locale].shipping[shipping.type]}</span></p>
            <p>${t[locale].email.html["delivery-address"]} <span>${shipping.address}</span></p>
            <p>${t[locale].email.html.customer} <b>${name.first} ${name.last}</b></p>
            <br />
            <p>${t[locale].email.html["your-order"]}</p>
            ${cart.map(toUserCartEntry).join("")}
        </div>
    `
});

const { PROTOCOL, DOMAIN } = process.env;
async function toFullCart(locale, cart) {
    const result = [];
    const { products } = await getCartProducts({ locale, ids: cart.map(({ id }) => id) });
    for(const product of products) {
        if(!product.available) return;

        const cartEntry = cart.find(({ id }) => id === product.id);
        result.push({
            href: `https://localhost/shop/${product.id}`,
            image: `${PROTOCOL}://${DOMAIN}${product.image}`,
            name: product.name,
            color: product.color,
            size: cartEntry.size,
            quantity: cartEntry.quantity,
            price: product.price
        });
    }
    return result;
}

export async function _post(locale, {
    id, name, phone, email, cart,
    payment, shipping, totalPrice,
    onlyEmail, subscribe
}) {
    try {
        const [fullAdminCart, fullUserCart] = await Promise.all([
            toFullCart("ru", cart),
            toFullCart(locale, cart)
        ]);

        const adminData = {
            id, name, phone, email,
            cart: fullAdminCart, payment,
            shipping, totalPrice,
            onlyEmail, subscribe
        };
        const userData = {
            id, name, phone, email,
            cart: fullUserCart, payment,
            shipping, totalPrice,
            onlyEmail, subscribe
        };

        const adminMessage = makeAdminMessage(adminData);
        const userMessage = makeUserMessage(locale, userData);

        console.log({ adminMessage });
        console.log({ userMessage });

        await Promise.all([
            transporter.sendMail(makeAdminMessage(adminData)),
            transporter.sendMail(makeUserMessage(locale, userData))
        ]);
        return { success: 1 };
    } catch(e) {
        console.error(e);
        return { success: 0 };
    }
}

// async function POST(req, res) {
//     const { email } = req.body;
//     const result = await _post({ email });
//     res.status(result.success ? 200 : 400).end();
// }