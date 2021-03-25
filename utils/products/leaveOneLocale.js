export default function f(product, locale) {
    return { ...product, locale: product.locales[locale], locales: undefined };
}