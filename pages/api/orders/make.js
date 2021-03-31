import { methodNotAllowed } from "../../../utils/common/network";

export default function handler(req, res) {
    console.log("Hello, world!");
    switch(req.method) {
        case "POST": return POST(req, res);
        default: return methodNotAllowed(req, res, ["POST"]);
    }
}

export function _post({ email, name, address, phone, only_email, subscribe, delivery, payment, cart, price }) {
    console.log("Someone made an order!", {
        email, name,
        address, phone,
        only_email, subscribe,
        delivery, payment,
        cart, price
    });
    return { success: 1 };
}

function POST(req, res) {
    const {
        email, name: { first, last },
        address, phone,
        only_email, subscribe,
        delivery, payment,
        cart, price
    } = req.body;
    const result = _post({
        email, name: { first, last },
        address, phone,
        only_email, subscribe,
        delivery, payment,
        cart, price
    });
    if(result.success === 1) res.status(200).json(result);
    else res.status(200).json(result);
}