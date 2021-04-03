import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import serializeForm from "../../utils/common/serializeForm";
import formatPrice from "../../utils/common/formatPrice";
import { useCallback, useEffect, useState } from "react";
import blocks from "../../scss/blocks.module.scss";
import { AddressSuggestions } from "react-dadata";
import { useTranslation } from "next-i18next";
import { inject, observer } from "mobx-react";
import 'react-dadata/dist/react-dadata.css';
import styles from "./index.module.scss";
import Select from "react-select";
import Head from "next/head";
import cn from "classnames";

const selectTheme = theme => ({
    ...theme, borderRadius: 0,
    colors: { ...theme.colors, primary: "black", neutral0: "transparent" }
});

const selectStyles = {
    container: () => ({
        width: "100%",
        fontSize: "16px"
    }),
    menu: () => ({
        backgroundColor: "whitesmoke",
        position: "absolute",
        width: "calc(100% - 2px)",
        zIndex: "1000",
        border: "1px solid black"
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            color: "#333333",
            backgroundColor: isDisabled ? null : (isSelected ? "#b4b4b4" : (isFocused ? "#cfcfcf" : null)),
        }
    }
}

const selectCountries = [{ value: "russia", label: "Россия" }];

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["page_order"]) }
});

export default inject("store")(observer(function Order({ store }) {
    const { t } = useTranslation("page_order");

    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const ids = store.cart.map(({ id }) => id);
        const response = await fetch(`/api/products/cart?ids=${ids.toString()}`);
        const json = await response.json();

        const products = json.reduce((products, product) => {
            const cartProduct = store.cart.find(({ id }) => id === product.id);
            if(cartProduct) products.push({ ...product, quantity: cartProduct.quantity });
            return products;
        }, []);

        setProducts(products);
    }, [store.cart]);

    const [productsPrice, setProductsPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    useEffect(() => {
        let productsPrice = 0;
        for(const { quantity, price } of products) productsPrice += quantity * price;
        setProductsPrice(productsPrice);
        setTotalPrice(productsPrice + deliveryPrice);
    }, [products, deliveryPrice]);

    const [country, setCountry] = useState(selectCountries[0]);
    const [dadataAddress, setDadataAddress] = useState();
    const [orderAddress, setOrderAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const changeDadataAddress = useCallback(address => {
        const { country, city, postal_code, region_with_type, street_with_type, house } = address.data;
        const houseAddress = `${street_with_type}, ${house}`;

        address.value = `${houseAddress}`;
        setDadataAddress(address);

        setOrderAddress(`${country}, ${region_with_type}, ${city}, ${postal_code}, ${houseAddress}`);
        setCity(city);
        setPostalCode(postal_code);
    }, []);

    const transformFormData = useCallback(formData => {
        formData = { ...formData };
        if(!formData.address.length) {
            formData.address = `${country.label}, ${city}, ${postalCode}, ${formData.raw_address}`;
        }
        formData.cart = JSON.parse(formData.cart);
        delete formData.city;
        delete formData.postal_code;
        delete formData.raw_address;
        delete formData[""];
        return formData;
    }, [city, postalCode]);

    const submitOrder = useCallback(async form => {
        const data = transformFormData(serializeForm(form));
        console.log({ data });
        console.log({ jsoned: JSON.stringify(data) });

        const response = await fetch("/api/orders/make", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(data)
        });
        const json = await response.json();
        console.log({ json });
    }, [transformFormData]);

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(blocks.content_block, styles.page)}>            
            <div className={styles.column}>
                <form className={styles.form} onSubmit={evt => {
                    evt.preventDefault();
                    submitOrder(evt.target);
                }}>
                    <input type="hidden" name="cart" value={JSON.stringify(store.cart)} />
                    <input type="hidden" name="price" value={totalPrice} />
                    <input type="hidden" name="address" value={orderAddress} />
                    <div className={styles.form_block}>
                        <p className={styles.form_block_title}>1. Адрес доставки</p>
                        <label className={styles.full_width_label}>
                            Адрес электронной почты
                            <input type="email" name="email" autoComplete="email" required />
                        </label>
                        <label className={styles.half_width_label}>
                            Имя
                            <input type="text" name="name.first" autoComplete="given-name" required />
                        </label>
                        <label className={styles.half_width_label}>
                            Фамилия
                            <input type="text" name="name.last" autoComplete="family-name" required />
                        </label>
                        <label className={styles.full_width_label}>
                            Страна
                            <Select
                                instanceId="country_select"
                                styles={selectStyles}
                                theme={selectTheme}
                                options={selectCountries}
                                value={country}
                                onChange={country => setCountry(country)}
                            />
                        </label>
                        <label className={styles.full_width_label}>
                            Адрес <br />
                            <div className={styles.full_width_label}>
                                <AddressSuggestions
                                    token="7c5272e224601f8a36fd147a354c266eb2494cd9"
                                    value={dadataAddress} onChange={changeDadataAddress}
                                    inputProps={{ name: "raw_address", required: true }}
                                />
                            </div>
                        </label>
                        <label className={styles.label_2_3}>
                            Город
                            <input
                                type="text" name="city" autoComplete="address-level2" required
                                value={city} onChange={e => setCity(e.target.value)} 
                            />
                        </label>
                        <label className={styles.label_1_3}>
                            Индекс
                            <input
                                type="text" name="postal_code" autoComplete="postal-code" required
                                value={postalCode} onChange={e => setPostalCode(e.target.value)} 
                            />
                        </label>
                        <label className={styles.full_width_label}>
                            Телефон
                            <input type="tel" name="phone" autoComplete="tel" required />
                        </label>
                        <label className={styles.full_width_label}>
                            <input className={styles.confidantial} type="checkbox" name="only_email" />
                            <p className={styles.confidantial}>Адрес электронной почты</p>
                        </label>
                        <label className={styles.full_width_label}>
                            <input
                                className={styles.confidantial} type="checkbox"
                                name="subscribe" defaultChecked
                            />
                            <p className={styles.confidantial}>
                                Да, я хочу получать новости и эксклюзивные предложения
                            </p>
                        </label>
                    </div>
                    <div className={styles.form_block}>
                        <p className={styles.form_block_title}>2. Способ доставки</p>
                        <div className={cn(styles.full_width_label, styles.delivery)}>
                            <label>
                                <input
                                    type="radio" name="delivery" value="cdek" required defaultChecked
                                    onClick={e => e.target.checked && setDeliveryPrice(0)}
                                />
                                СDEK
                            </label>
                            <p className={styles.price}>Бесплатно</p>
                        </div>
                        <div className={cn(styles.full_width_label, styles.delivery)}>
                            <label>
                                <input
                                    type="radio" name="delivery" value="courier" required
                                    onClick={e => e.target.checked && setDeliveryPrice(500)}
                                />
                                Курьер
                            </label>
                            <p className={styles.price}>500р</p>
                        </div>
                    </div>
                    <div className={styles.form_block}>
                        <p className={styles.form_block_title}>3. Оплата</p>
                        <label className={cn(styles.full_width_label, styles.payment)}>
                            <input type="radio" name="payment" value="online" required defaultChecked />
                            &nbsp;Онлайн
                        </label>
                        <label className={cn(styles.full_width_label, styles.payment)}>
                            {/* <input type="radio" name="payment" value="online" required defaultChecked /> Онлайн
                            <br /> */}
                            <input type="radio" name="payment" value="cash" required />
                            &nbsp;Наличными курьеру
                        </label>
                    </div>
                    <div className={styles.form_block}>
                        <button className={styles.pay_button}>Оплатить</button>
                    </div>
                </form>
            </div>
            <div className={styles.column}>
                <div className={styles.order_preview}>
                    { products.map(product => <ProductCard key={product.id} {...product} />) }
                    <div className={styles.data_row}>
                        <p>Промежуточный итог:</p>
                        <p>{ formatPrice(productsPrice) } &#8381;</p>
                    </div>
                    <div className={styles.data_row}>
                        <p>Доставка:</p>
                        { deliveryPrice === 0 && <p>Бесплатно</p> }
                        { deliveryPrice !== 0 && <p>{ formatPrice(deliveryPrice) } &#8381;</p> }
                    </div>
                    <div className={cn(styles.data_row, styles.ammount)}>
                        <p className={styles.ammount_text}>Итого:</p>
                        <p className={styles.ammount_text}>{ formatPrice(totalPrice) } &#8381;</p>
                    </div>
                </div>
            </div>
        </div>
    </>);
}));

function ProductCard({ image, quantity, price, name, color }) {
    return (
        <div className={styles.product_row}>
            <div className={styles.col_1}>
                <img src={image} alt="" width="100%" />
                <div className={styles.quantity}>{ quantity }</div>
            </div>
            <div className={styles.col_2}>{ name } / { color }</div>
            <div className={styles.col_3}>{ formatPrice(quantity * price) } &#8381;</div>
        </div>
    );
}