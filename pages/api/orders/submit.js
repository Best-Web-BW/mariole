import { success, error, methodNotAllowed } from "../../../utils/common/network";
import { _post as sendOrderEmail } from "../mail/order";
import connect from "../../../utils/mongo/connect";

export default function handler(req, res) {
    return methodNotAllowed(req, res, []);
}

export async function _post({ submitUUID }) {
    let orders, order;
    try {
        const { db } = await connect();
        orders = db.collection("orders");
        order = await orders.findOne({ submitUUID });
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    if(!order) return error("no_order");

    try {
        await sendOrderEmail(order);
    } catch(e) {
        console.error(e);
        return error("mail_error");
    }

    try {
        await orders.updateOne({ _id: order._id }, { $unset: { submitUUID: 1 } });
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    return success({ id: order.id });
}