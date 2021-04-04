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
                <p>Информация о заказе №<span></span></p>
                <p>Заказчик: <b></b></p>
                <p>Телефон: <b></b></p>
                <p>Email: <b></b></p>
                <p>Адрес доставки: <span><i></i></span></p>
                <br/>
                <p>Товары в заказе:</p>
                <ul>
                    <li>
                        <p>
                            <span>name</span>
                            <span>color</span>
                            <span>size</span>
                            <span>quantity</span>
                            <span>price</span>
                            <span>link</span>
                        </p>
                    </li>
                </ul>
                <br/>
                <p>Метод оплаты: <span></span></p>
                <p>Заказ на сумму: <b></b></p>
                <p>Включая доставку: <b></b></p>
            </div>
        `
    };
}

function makeUserMessage({ email }) {
    return {
        from: `"${mariole}" <${address}>`,
        to: email,
        subject: `Успешное оформление заказа`,
        html: `
        <div>
        <h2>Спасибо за Ваш заказ!</h2>
        <br/>
        <p>Далее Вы можете ознакомиться с детальной информацией.</p>
        <br/>
        <p>Сумма вашего заказа: <b>summ</b></p>
        <p>Включаяя доставку: <b></b></p>
        <p>Метод оплаты: <b>наличными курьеру/картой курьеру/онлайн оплата</b></p>
        <p>Доставить по адресу: <span>адрес</span></p>
        <p>Заказчик: <b>Имя</b></p>
        <br/>
        <p>Вфш заказ:</p>
        <div style="
        display: block;
        ">
            <div style="
            border-bottom: 1px solid #cfcfcf; 
            display: flex;
            flex-wrap: nowrap; 
            justify-content: center;
            align-items: center;
            ">
                <div className={styles.col_1} style="
                width: 20%;
                position: relative;
                ">
                    <img src="mario_le-1100 копия.jpg" alt="" width="100%" />
                    <div className={styles.quantity} style="
                    position: absolute;
                    top: 0;
                    right: 0;
                    background-color: #cfcfcf;
                    border-radius: 50%;
                    height: 20px;
                    width: 20px;
                    font-size: 16px;
                    display: flex;
                    flex-wrap: nowrap; 
                    justify-content: center;
                    align-items: center;
                    ">{ 1 }</div>
                </div>
                <div className={styles.col_2} style="
                width: calc(40% - 20px);
                padding-left: 20px;
                font-size: 16px;
                ">{ Название продукта } / { colors(color) }</div>
                <div className={styles.col_3} style="
                width: 40%;
                display: flex;
                flex-wrap: nowrap;
                justify-content: flex-end;
                font-size: 16px;
                ">{ formatPrice(50000) } &#8381;</div>
            </div>
        </div>
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