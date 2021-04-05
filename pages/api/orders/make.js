import { methodNotAllowed } from "../../../utils/common/network";
import { _get as getCartProducts } from "../products/cart";
import { _post as sendOrderEmail } from "../mail/order";
import { v4 as UUID } from "uuid";
// import YooKassa from "yookassa";

export default function handler(req, res) {
    switch(req.method) {
        case "POST": return POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

function toEmailCart(cart) {
    const result = [];
    const products = getCartProducts({ ids: cart.map(({ id }) => id) });
    for(const product of products) {
        const cartEntry = cart.find(({ id }) => id === product.id);
        result.push({
            href: `https://localhost/shop/${product.id}`,
            image: product.image,
            name: product.name,
            color: product.color,
            size: cartEntry.size,
            quantity: cartEntry.quantity,
            price: product.price
        });
    }
    return result;
}

function getShippingPrice(shippingType) {
    if(shippingType === "cdek") return process.env.SHIPPING_CDEK_PRICE;
    else if(shippingType === "courier") return process.env.SHIPPING_COURIER_PRICE;
    else throw Error(`Invalid shipping type: '${shippingType}'`);
}

function calcTotalPrice(cart, shippingPrice) {
    const cartPrice = cart.reduce((sum, { quantity, price }) => sum += quantity * price, 0);
    return cartPrice + shippingPrice;
}

function createPayment(sum, description, submitURL) {
    return {
        amount: {
            value: sum,
            currency: "RUB"
        },
        description,
        capture: true,
        confirmation: {
            type: "redirect",
            return_url: submitURL
        }
    };
}

async function fetchPayment(shopID, secretKey, idempotenceKey, payment) {
    const response = await fetch("https://api.yookassa.ru/v3/payments", {
        method: "POST",
        body: JSON.stringify(payment),
        headers: {
            "Authorization": `Basic ${btoa(`${shopID}:${secretKey}`)}`,
            "Idempotence-Key": idempotenceKey,
            "Content-Type": "application/json;charset=utf-8"
        }
    });
    const { confirmation: { confirmation_url } } = await response.json();
    return confirmation_url;
}

export function _post({
    email, name, address, phone,
    only_email, subscribe,
    delivery, payment, cart
}) {
    try {
        // console.log("Someone made an order!", {
        //     email, name, address, phone,
        //     only_email, subscribe,
        //     delivery, payment, cart,
        //     price, shipping_price
        // });
    
        const submitUUID = UUID();
        const submitURL = `${process.env.PROTOCOL}://${process.env.DOMAIN}/?submit=${submitUUID}`;
        console.log({ submitUUID, submitURL });

        const id = "000000";
        
        const emailCart = toEmailCart(cart);
        const shippingPrice = getShippingPrice(delivery);
        const totalPrice = calcTotalPrice(emailCart, shippingPrice);
        const emailData = {
            id, name, phone, email,
            cart: emailCart,
            shippingType: delivery,
            paymentType: payment,
            only_email, subscribe,
            shippingAddress: address,
            shippingPrice,
            totalPrice
        };
        
        // console.log("Email data", emailData);
        
        const result = sendOrderEmail(emailData);
        console.log({ result });
        
        if(false && payment === "online") { // TEMPORARILY CLOSED
            // Work with Yandex.Kassa
            const payment = createPayment(totalPrice, `Заказ №${id}`, submitURL);
            const confirmationURL = fetchPayment("", "", "", payment);
            return { success: 1, url: confirmation_url };
        } else {
            // Directly place an order
            return { success: 1, url: submitURL };
        }
    } catch(e) {
        console.error(e);
        return { success: 0 };
    }
}

function POST(req, res) {
    const {
        email, name: { first, last },
        address, phone,
        only_email, subscribe,
        delivery, payment, cart
    } = req.body;
    const result = _post({
        email, name: { first, last },
        address, phone,
        only_email, subscribe,
        delivery, payment, cart
    });
    if(result.success === 1) res.status(200).json(result);
    else res.status(500).json(result);
}