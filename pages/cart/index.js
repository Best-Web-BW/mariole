import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import formatPrice from "../../utils/common/formatPrice";
import RecentBlock from "../../components/RecentBlock";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Link from "next/link";
import Head from "next/head";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["page_cart"]) }
});

export default inject("store")(observer(function Cart({ store }) {
    const { t } = useTranslation("page_cart");

    const [products, setProducts] = useState([]);
    const [fetched, setFetched] = useState(false);
    useEffect(async () => {
        const ids = store.cart.map(({ id }) => id);
        const response = await fetch(`/api/products/cart?ids=${ids.toString()}`);
        const json = await response.json();

        const products = json.reduce((products, product) => {
            const cartProduct = store.cart.find(({ id }) => id === product.id);
            if(cartProduct) products.push({
                ...product,
                quantity: cartProduct.quantity,
                size: cartProduct.size
            });
            return products;
        }, []);

        setProducts(products);
        setFetched(true);
    }, [store.cart.length]);
    useEffect(() => {
        if(fetched) {
            const remainingProducts = products.filter(product => store.cart.find(({ id }) => id === product.id));
            setProducts(remainingProducts);
        }
    }, [store.cart.length]);
    useEffect(() => {
        if(fetched) {
            const updatedProducts = products.reduce((updatedProducts, product) => {
                const cartProduct = store.cart.find(({ id }) => product.id === id);
                if(cartProduct) updatedProducts.push({ ...product, quantity: cartProduct.quantity });
                return updatedProducts;
            }, []);
            setProducts(updatedProducts);
        }
    }, [store.cart.reduce((quantitySum, { quantity }) => quantitySum + quantity, 0)]);

    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        let totalPrice = 0;
        for(const { quantity, price } of products) {
            totalPrice += quantity * price;
        };
        setTotalPrice(totalPrice);
    }, [products]);

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={blocks.content_block}>
            <div className={styles.content}>
                <h2>КОРЗИНА</h2>
                { (fetched && !products.length) && <EmptyCartMessage /> }
                <div className={cn(styles.data_row, styles.desktop_flex)}>
                    <p className={styles.col_2}>Цена</p>
                    <p className={styles.col_3}>Количество</p>
                    <p className={styles.col_4}>Итого</p>
                </div>
                { products.map(product => <ProductEntry key={product.id} {...product} />) }
                <div className={styles.ammount_row}>
                    <p className={styles.col_1}>ПРОМЕЖУТОЧНЫЙ ИТОГ</p>
                    <p className={styles.col_2}>{ formatPrice(totalPrice) } &#8381;</p>
                    <p className={styles.col_3}>Стоимость доставки будет учтена при оформлении заказа.</p>
                </div>
                <Link href="/order">
                    <a>
                        <button className={styles.order_button}>ОФОРМИТЬ ЗАКАЗ</button>
                    </a>
                </Link>
            </div>
            <RecentBlock styles={styles} />
        </div>
    </>);
}));

const EmptyCartMessage = () => (
    <div className={styles.empty_cart}>
        <p>Ваша корзина пуста</p>
        <br />
        <Link href="/shop">
            <a>Продолжить покупки</a>
        </Link>
    </div>
);

const ProductEntry = ({ id, image, name, color, size, quantity, price }) => (
    <div className={styles.product_row}>
        <div className={styles.product_photo}>
            <img src={image} alt="" width="100%" />
        </div>
        <div className={styles.product_name}>
            <Link href={`/shop/${id}`}>
                <a>{ name } / { color }</a>
            </Link>
            <p className={styles.size}>{ size }</p>
            <DeleteButton id={id} />
        </div>
        <div className={styles.col_2}>
            <p>{ formatPrice(price) } &#8381;</p>
        </div>
        <QuantitySelector quantity={quantity} id={id} />
        <div className={styles.col_4}>
            <p>{ formatPrice(price * quantity) } &#8381;</p>
        </div>
    </div>
);

const DeleteButton = inject("store")(observer(({ store, id }) => (
    <button
        className={styles.delete_button}
        onClick={() => store.removeFromCart(id)}
    >Удалить</button>
)));

const QuantitySelector = inject("store")(observer(({ store, quantity, id }) => (
    <div className={styles.col_3}>
        <div className={styles.choose_quantity}>
            <input
                type="number" name="quantity" min={1} value={quantity}
                onChange={evt => store.setCartQuantity(id, Math.max(+evt.target.value, 1))}
            />
        </div>
    </div>
)));