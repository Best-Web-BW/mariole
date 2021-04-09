import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback, useEffect, useMemo, useState } from "react";
import serializeForm from "../../utils/common/serializeForm";
import formatPrice from "../../utils/common/formatPrice";
import blocks from "../../scss/blocks.module.scss";
import { AddressSuggestions } from "react-dadata";
import { useTranslation } from "next-i18next";
import { inject, observer } from "mobx-react";
import 'react-dadata/dist/react-dadata.css';
import styles from "./index.module.scss";
import Select from "react-select";
import Router from "next/router";
import Head from "next/head";
import cn from "classnames";

const select = {
    theme: theme => ({
        ...theme,
        borderRadius: 0,
        colors: {
            ...theme.colors,
            primary: "black",
            neutral0: "transparent"
        }
    }),
    styles: {
        container: () => ({
            width: "100%",
            fontSize: "16px"
        }),
        menu: () => ({
            backgroundColor: "whitesmoke",
            width: "calc(100% - 2px)",
            border: "1px solid black",
            position: "absolute",
            zIndex: "1000"
        }),
        option: (styles, { isDisabled, isFocused, isSelected }) => ({
            ...styles,
            color: "#333333",
            backgroundColor: (
                isDisabled
                ? null
                : (
                    isSelected
                    ? "#b4b4b4"
                    : (
                        isFocused
                        ? "#cfcfcf"
                        : null
                    )
                )
            ),
        })
    }
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        CDEK_PRICE: +process.env.SHIPPING_CDEK_PRICE,
        COURIER_PRICE: +process.env.SHIPPING_COURIER_PRICE,
        locale,
        ...await serverSideTranslations(locale, [
            "common_colors",
            "common_countries",
            "page_order"
        ])
    }
});

export default inject("store")(observer(function Order({ store, locale, CDEK_PRICE, COURIER_PRICE }) {
    const { t } = useTranslation("page_order");
    const { t: colors } = useTranslation("common_colors");
    const { t: countries } = useTranslation("common_countries");

    const selectCountries = useMemo(() => {
        return [
            "russia"
        ].map(country => ({ value: country, label: countries(country) }));
    }, []);

    const [submittable, setSubmittable] = useState(false);
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const ids = store.cart.map(({ id }) => id);
        const response = await fetch(`/api/products/cart?locale=${locale}&ids=${ids.toString()}`);
        const json = await response.json();

        const products = json.reduce((products, product) => {
            const cartProduct = store.cart.find(({ id }) => id === product.id);
            if(cartProduct) products.push({ ...product, quantity: cartProduct.quantity });
            return products;
        }, []);

        setSubmittable(products.every(({ available }) => available) && !!products.length);
        setProducts(products);
    }, [store.cart]);

    const [shippingMethod, setShippingMethod] = useState("cdek");
    const [deliveryPrice, setDeliveryPrice] = useState(CDEK_PRICE);
    const [paymentMethod, setPaymentMethod] = useState("online");
    const switchShippingMethod = shippingMethod => {
        if(shippingMethod === "cdek") {
            setDeliveryPrice(CDEK_PRICE);
            setPaymentMethod("online");
        } else if(shippingMethod === "courier") {
            setDeliveryPrice(COURIER_PRICE);
        }
        setShippingMethod(shippingMethod);
    }

    const [productsPrice, setProductsPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
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
        const response = await fetch(`/api/orders/make?locale=${locale}`, {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(data)
        });
        if(response.status === 200) {
            const json = await response.json();
            Router.push(json.url);
        }
    }, [transformFormData]);

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(blocks.content_block, styles.page)}>            
            <div className={styles.column}>
                <form className={styles.form} onSubmit={evt => {
                    evt.preventDefault();
                    if(submittable) submitOrder(evt.target);
                }}>
                    <input type="hidden" name="cart" value={JSON.stringify(store.cart)} />
                    <input type="hidden" name="address" value={orderAddress} />
                    <div className={styles.form_block}>
                        <p className={styles.form_block_title}>1. { t("shipping-address") }</p>
                        <label className={styles.full_width_label}>
                            { t("email") }
                            <input type="email" name="email" autoComplete="email" required />
                        </label>
                        <label className={styles.half_width_label}>
                            { t("first-name") }
                            <input type="text" name="name.first" autoComplete="given-name" required />
                        </label>
                        <label className={styles.half_width_label}>
                            { t("last-name") }
                            <input type="text" name="name.last" autoComplete="family-name" required />
                        </label>
                        <label className={styles.full_width_label}>
                            { t("country") }
                            <Select
                                onChange={country => setCountry(country)}
                                instanceId="country_select"
                                options={selectCountries}
                                value={country}
                                {...select}
                            />
                        </label>
                        <label className={styles.full_width_label}>
                            { t("address") } <br />
                            <div className={styles.full_width_label}>
                                <AddressSuggestions
                                    token="7c5272e224601f8a36fd147a354c266eb2494cd9"
                                    value={dadataAddress} onChange={changeDadataAddress}
                                    inputProps={{ name: "raw_address", required: true }}
                                />
                            </div>
                        </label>
                        <label className={styles.label_2_3}>
                            { t("city") }
                            <input
                                type="text" name="city" autoComplete="address-level2" required
                                value={city} onChange={e => setCity(e.target.value)} 
                            />
                        </label>
                        <label className={styles.label_1_3}>
                            { t("postal-code") }
                            <input
                                type="text" name="postal_code" autoComplete="postal-code" required
                                value={postalCode} onChange={e => setPostalCode(e.target.value)} 
                            />
                        </label>
                        <label className={styles.full_width_label}>
                            { t("phone") }
                            <input type="tel" name="phone" autoComplete="tel" required />
                        </label>
                        <label className={styles.full_width_label}>
                            <input className={styles.confidantial} type="checkbox" name="only_email" />
                            <p className={styles.confidantial}>{ t("only-email") }</p>
                        </label>
                        <label className={styles.full_width_label}>
                            <input
                                className={styles.confidantial} type="checkbox"
                                name="subscribe" defaultChecked
                            />
                            <p className={styles.confidantial}>{ t("subscribe") }</p>
                        </label>
                    </div>
                    <div className={styles.form_block}>
                        <p className={styles.form_block_title}>2. { t("shipping-method") }</p>
                        <ShippingMethodRadio
                            title={t("cdek")}
                            value="cdek"
                            {...{
                                shippingMethod,
                                switchShippingMethod
                            }}
                        >
                            <p className={styles.price}>{ t("free") }</p>
                        </ShippingMethodRadio>
                        <ShippingMethodRadio
                            title={t("courier")}
                            value="courier"
                            {...{
                                shippingMethod,
                                switchShippingMethod
                            }}
                        >
                            <p className={styles.price}>{ COURIER_PRICE } &#8381;</p>
                        </ShippingMethodRadio>
                    </div>
                    <div className={styles.form_block}>
                        <p className={styles.form_block_title}>3. { t("payment") }</p>
                        <PaymentMethodRadio
                            title={t("online")}
                            value="online"
                            {...{
                                paymentMethod,
                                setPaymentMethod
                            }}
                        />
                        <PaymentMethodRadio
                            enabled={shippingMethod === "courier"}
                            title={t("cash-to-courier")}
                            value="offline_cash"
                            {...{
                                paymentMethod,
                                setPaymentMethod
                            }}
                        />
                        <PaymentMethodRadio
                            enabled={shippingMethod === "courier"}
                            title={t("card-to-courier")}
                            value="offline_card"
                            {...{
                                paymentMethod,
                                setPaymentMethod
                            }}
                        />
                    </div>
                    <div className={styles.form_block}>
                        <button
                            className={cn(styles.pay_button, { [styles.disabled]: !submittable })}
                            onClick={evt => !submittable && evt.preventDefault()}
                        >{ t("place") }</button>
                    </div>
                </form>
            </div>
            <div className={styles.column}>
                <div className={styles.order_preview}>
                    { products.map(product => <ProductCard key={product.id} {...product} colors={colors} />) }
                    <div className={styles.data_row}>
                        <p>{ t("subtotal") }</p>
                        <p>{ formatPrice(productsPrice) } &#8381;</p>
                    </div>
                    <div className={styles.data_row}>
                        <p>{ t("shipping") }</p>
                        { deliveryPrice === 0 && <p>{ t("free") }</p> }
                        { deliveryPrice !== 0 && <p>{ formatPrice(deliveryPrice) } &#8381;</p> }
                    </div>
                    <div className={cn(styles.data_row, styles.ammount)}>
                        <p className={styles.ammount_text}>{ t("total") }</p>
                        <p className={styles.ammount_text}>{ formatPrice(totalPrice) } &#8381;</p>
                    </div>
                </div>
            </div>
        </div>
    </>);
}));

function ProductCard({ image, quantity, price, name, color, colors }) {
    return (
        <div className={styles.product_row}>
            <div className={styles.col_1}>
                <img src={image} alt="" width="100%" />
                <div className={styles.quantity}>{ quantity }</div>
            </div>
            <div className={styles.col_2}>{ name } / { colors(color) }</div>
            <div className={styles.col_3}>{ formatPrice(quantity * price) } &#8381;</div>
        </div>
    );
}

function ShippingMethodRadio({ children, title, value, shippingMethod, switchShippingMethod }) {
    return (
        <div className={cn(styles.full_width_label, styles.delivery)}>
            <label>
                <input
                    onChange={e => e.target.checked && switchShippingMethod(value)}
                    checked={shippingMethod === value}
                    name="delivery"
                    value={value}
                    type="radio"
                    required
                />
                { title }
            </label>
            { children }
        </div>
    );
}

function PaymentMethodRadio({ enabled = true, title, value, paymentMethod, setPaymentMethod }) {
    if(!enabled) return null;

    return (
        <label className={cn(styles.full_width_label, styles.payment)}>
            <input
                onChange={e => enabled && e.target.checked && setPaymentMethod(value)}
                checked={paymentMethod === value}
                name="payment"
                value={value}
                type="radio"
                required
            />
            &nbsp;{ title }
        </label>
    );
}