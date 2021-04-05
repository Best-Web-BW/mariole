export default function leaveOneLocale(product, locale) {
    const newProduct = { ...product, locale: product.locales[locale] };
    delete newProduct.locales;
    return newProduct;
}