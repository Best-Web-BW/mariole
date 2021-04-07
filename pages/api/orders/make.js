import { success, error, methodNotAllowed } from "../../../utils/common/network";
import { _get as getCartProducts } from "../products/cart";
import { _post as placeOrder } from "./place";

export default async function handler(req, res) {
    switch(req.method) {
        case "POST": return await POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

async function toFullCart(cart) {
    const result = [];
    const { products } = await getCartProducts({ ids: cart.map(({ id }) => id) });
    for(const product of products) {
        if(!product.available) return;

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
    if(shippingType === "cdek") return +process.env.SHIPPING_CDEK_PRICE;
    else if(shippingType === "courier") return +process.env.SHIPPING_COURIER_PRICE;
    else throw Error(`Invalid shipping type: '${shippingType}'`);
}

function calcTotalPrice(cart, shippingPrice) {
    const cartPrice = cart.reduce((sum, { quantity, price }) => sum += quantity * price, 0);
    return cartPrice + shippingPrice;
}

// function createPayment(sum, description, submitURL) {
//     return {
//         amount: {
//             value: sum,
//             currency: "RUB"
//         },
//         description,
//         capture: true,
//         confirmation: {
//             type: "redirect",
//             return_url: submitURL
//         }
//     };
// }

// async function fetchPayment(shopID, secretKey, idempotenceKey, payment) {
//     const response = await fetch("https://api.yookassa.ru/v3/payments", {
//         method: "POST",
//         body: JSON.stringify(payment),
//         headers: {
//             "Authorization": `Basic ${btoa(`${shopID}:${secretKey}`)}`,
//             "Idempotence-Key": idempotenceKey,
//             "Content-Type": "application/json;charset=utf-8"
//         }
//     });
//     const { confirmation: { confirmation_url } } = await response.json();
//     return confirmation_url;
// }

async function transformData({
    email, phone, name: {
        first: firstName,
        last: lastName
    }, cart, address, delivery,
    payment, only_email, subscribe
}) {
    const fullCart = await toFullCart(cart);
    if(!fullCart) return;

    const shippingPrice = getShippingPrice(delivery);
    const totalPrice = calcTotalPrice(fullCart, shippingPrice);
    return {
        name: {
            first: firstName,
            last: lastName
        },
        phone, email, cart,
        shipping: {
            address,
            type: delivery,
            price: shippingPrice
        },
        payment, totalPrice,
        onlyEmail: only_email,
        subscribe
    };
}

export async function _post(data) {
    try {
        const orderData = await transformData(data);
        if(!orderData) return error("unavailable_product");

        const result = await placeOrder(orderData);
        if(!result.success) return error(result.error);

        return success({ url: result.submitURL });
    } catch(e) {
        console.error(e);
        return error("internal_error");
    }
}

async function POST(req, res) {
    const {
        email, name: { first, last },
        address, phone,
        only_email, subscribe,
        delivery, payment, cart
    } = req.body;
    const result = await _post({
        email, name: { first, last },
        address, phone,
        only_email, subscribe,
        delivery, payment, cart
    });
    if(result.success === 1) res.status(200).json(result);
    else switch(result.error) {
        case "unavailable_product":
            res.status(406).end();
            break;
        default:
            res.status(500).end(result.error);
            break;
    }
}