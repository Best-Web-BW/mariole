import { methodNotAllowed } from "../../../utils/common/network";
import { _get as getCartProducts } from "../products/cart";
import { _post as sendOrderEmail } from "../mail/order";

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

function calcTotalPrice(cart, shippingPrice) {
    const cartPrice = cart.reduce((sum, { quantity, price }) => sum += quantity * price, 0);
    return cartPrice + shippingPrice;
}

export function _post({
    email, name, address, phone,
    only_email, subscribe,
    delivery, payment, cart
}) {
    // console.log("Someone made an order!", {
    //     email, name, address, phone,
    //     only_email, subscribe,
    //     delivery, payment, cart,
    //     price, shipping_price
    // });

    if(payment === "online") {
        // Work with Yandex.Kassa
    } else {
        // Directly place an order
    }

    const id = "000000";

    const emailCart = toEmailCart(cart);
    const shippingPrice = delivery === "courier" ? 500 : 0;
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

    return { success: 1 };
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
    else res.status(200).json(result);
}