import leaveOneLocale from "../../../utils/products/leaveOneLocale";
import { methodNotAllowed } from "../../../utils/common/network";
import products from "./products.json";

export default function handler(req, res) {
    switch(req.method) {
        case "GET": return GET(req, res);
        case "POST": return POST(req, res);
        case "PATCH": return PATCH(req, res);
        case "DELETE": return DELETE(req, res);
        default: return methodNotAllowed(req, res, ["GET", "POST", "PATCH", "DELETE"]);
    }
}

export function _get({ locale = "ru", id = 0 }) {
    const product = products.find(entry => entry.id === id);
    if(product) {
        const linkedProducts = products.filter(({ space }) => space === product.space);
        product.links = linkedProducts.map(({ id, color, images: [image] }) => ({ id, color, image }));
        return leaveOneLocale(product, locale);
    } else return product;
}

function GET(req, res) {
    const { locale, id } = req.query;
    const product = _get({ locale, id: +id });
    if(product) res.status(200).json(product);
    else res.status(404).end();
}

export function _post(data) {
    console.log({ action: "_post", data });
    return { success: 1 };
}

function POST(req, res) {
    const {
        price, locales: {
            ru: {
                name: ruName,
                description: ruDescription,
                composition: ruComposition,
                details: ruDetails
            },
            en: {
                name: enName,
                description: enDescription,
                composition: enComposition,
                details: enDetails
            }
        }, color, sizes, /* images, */
        category, subcategory,
        limited, bestseller,
        available, parent
    } = req.body;
    const result = _post({
        price, locales: {
            ru: {
                name: ruName,
                description: ruDescription,
                composition: ruComposition,
                details: ruDetails
            },
            en: {
                name: enName,
                description: enDescription,
                composition: enComposition,
                details: enDetails
            }
        }, color, sizes, /* images, */
        category, subcategory,
        limited, bestseller,
        available, parent
    });
    res.status(200).json(result);
}

export function _patch(data) {
    console.log({ action: "_patch", data });
    return { success: 1 };
}

function PATCH(req, res) {
    const { id } = req.query;
    const {
        price, locales: {
            ru: {
                name: ruName,
                description: ruDescription,
                composition: ruComposition,
                details: ruDetails
            },
            en: {
                name: enName,
                description: enDescription,
                composition: enComposition,
                details: enDetails
            }
        }, color, sizes, /* images, */
        category, subcategory,
        limited, bestseller,
        available, parent
    } = req.body;
    const result = _patch({
        id: +id, price, locales: {
            ru: {
                name: ruName,
                description: ruDescription,
                composition: ruComposition,
                details: ruDetails
            },
            en: {
                name: enName,
                description: enDescription,
                composition: enComposition,
                details: enDetails
            }
        }, color, sizes, /* images, */
        category, subcategory,
        limited, bestseller,
        available, parent
    });
    res.status(200).json(result);
}

function _delete({ id }) {
    console.log({ action: "_delete", id });
    return { success: 1 };
}

function DELETE(req, res) {
    const { id } = req.query;
    const result = _delete({ id: +id });
    res.status(200).json(result);
}