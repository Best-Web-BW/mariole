import { success, error, methodNotAllowed } from "../../../utils/common/network";
import { getMaxID } from "../../../utils/mongo/getMaxID";
import connect from "../../../utils/mongo/connect";
import { v4 as UUID } from "uuid";

export default function handler(req, res) {
    return methodNotAllowed(req, res, []);
}

export async function _post(orderData) {
    try {
        orderData.submitUUID = UUID();
    } catch(e) {
        console.error(e);
        return error("uuid_error");
    }

    let orders, id;
    try {
        const { db } = await connect();
        orders = db.collection("orders");

        id = await getMaxID(orders) + 1;
        orderData.id = id;

        await orders.insertOne(orderData);
    } catch(e) {
        console.error(e);
        return error("db_error");
    }

    let submitURL;
    try {
        const host = `${process.env.PROTOCOL}://${process.env.DOMAIN}/`;
        submitURL = `${host}?submitUUID=${orderData.submitUUID}`;
    } catch(e) {
        console.error(e);
        return error("internal_error");
    }

    return success({ submitURL, id });
}