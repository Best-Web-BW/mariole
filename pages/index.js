import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { _post as submitOrder } from "./api/orders/submit";
import ProductCard from "../components/ProductCard";
import blocks from "../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import lorem from "../utils/common/lorem";
import styles from "./index.module.scss";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";

export async function getServerSideProps({ locale, query: { submitUUID } }) {
    const props = {};
    if(submitUUID) {
        const result = await submitOrder({ locale, submitUUID });
        if(result.success) props.orderID = result.id;
        else return { redirect: { destination: "/" } }
    }

    return {
        props: {
            locale,
            ...props,
            ...await serverSideTranslations(locale, [
                "page_index",
                "component_product-card"
            ])
        }
    }
}

export default inject("store")(observer(function Index({ store, locale, orderID }) {
    const { t } = useTranslation("page_index");
    const { t: productCard } = useTranslation("component_product-card");

    useEffect(() => {
        if(typeof orderID === "number") {
            store.resetCart();
        }
    }, []);

    return (<>
        <Head>
            <title>{ t("title") }</title>
            <meta name="description" content={lorem(100)} />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
        </Head>
        <div className={blocks.content_body}>
            <div className={cn(blocks.main_block, styles.first_block)}>
                <img className={blocks.desktop} src="/images/blocks/FullSizeRender1" alt="" />
                <img className={blocks.mobile} src="/images/blocks/mario_le-1817" alt="" />
                <Link href="/shop">
                    <a className={blocks.absolute_link}>
                        <button>{ t("start-shopping-caps") }</button>
                    </a>
                </Link>
            </div>
            <div className={blocks.content_block}>
                <div className={styles.about_area}>
                    <div className={cn(blocks.row, styles.row)}>
                        <p>{ t("about.craft") }</p>
                    </div>
                    <div className={cn(blocks.column, styles.column)}>
                        <img src="/images/blocks/mario_le-1684" alt="" />
                    </div>
                    <div className={cn(blocks.column, styles.column)}>
                        <p>
                            { t("about.mariole") }
                            <br />
                            <br />
                            { t("about.secret") }
                            <br />
                            <br />
                            { t("about.properties") }
                            <br />
                            <br />
                            { t("about.traditions") }
                        </p>
                    </div>
                </div>
            </div>
            <SpecialBlock
                fetchLink={`/api/products?locale=${locale}&limited=1&max=4`}
                title={t("limited-collection-caps")}
                productCard={productCard}
                href="/shop?limited=1"
                t={t}
            />
            <div className={cn(blocks.content_block, styles.photo_link_wrapper)}>
                <Link href="/shop?category=knitwear">
                    <a className={styles.photo_link}>
                        <p className={styles.photo_link_title}>{ t("knitwear-caps") }</p>
                        <img className={styles.desktop} src="/images/blocks/FullSizeRender" alt="" />
                        <img className={styles.mobile} src="/images/blocks/FullSizeRender" alt="" />
                    </a>
                </Link>
            </div>
            <SpecialBlock
                fetchLink={`/api/products?locale=${locale}&bestseller=1&max=4`}
                title={t("bestsellers-caps")}
                productCard={productCard}
                href="/shop?bestseller=1"
                t={t}
            />
            <div className={blocks.content_block}>
                <div className={cn(blocks.row, styles.title_row)}>
                    <h2 className={blocks.block_title}>{ t("they-write-caps") }</h2>
                </div>
                <div className={cn(blocks.row, styles.press)}>
                    <img src="/images/press/aeroflot" alt="" />
                    <a
                        className={styles.press_elem} target="_blank"
                        href="https://www.elledecoration.ru/heroes/design/novye-imena-luchshie-tekstilnye-mastera-rossii-i-belarusi-id6858881/"
                    >
                        <img src="/images/press/elle_decoration" alt="" />
                    </a>
                </div>
            </div>
        </div>
    </>);
}));

function SpecialBlock({ fetchLink, href, title, t, productCard }) {
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const response = await fetch(fetchLink);
        setProducts(await response.json());
    }, []);

    return (
        <div className={blocks.content_block}>
            <div className={cn(blocks.row, styles.title_row)}>
                <h2 className={blocks.block_title}>{ title }</h2>
                <Link href={href}>
                    <a className={styles.showall}>{ t("view-all") }</a>
                </Link>
            </div>
            <div className={styles.products_block}>
                <div className={cn(blocks.row, styles.product_row)}>{
                    products.map(product => <ProductCard key={product.id} data={product} t={productCard} />)
                }</div>
            </div>
        </div>
    );
}