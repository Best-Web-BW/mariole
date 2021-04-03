import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductCard from "../../components/ProductCard";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import Head from "next/head";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["favorite"]) }
});

export default inject("store")(observer(function Favorite({ store }) {
    const { t } = useTranslation("favorite");
    
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const response = await fetch(`/api/products?ids=${store.favorite.toString()}`);
        const json = await response.json();
        setProducts(json);
    }, [store.favorite]);

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(blocks.main_block, styles.page)}>
            <h2 className={cn(blocks.block_title, styles.title)}>{ t("title") }</h2>
            <div className={styles.favorite_row}>{
                products.map(product => <Element key={product.id} product={product} t={t} />)
            }</div>
        </div>
    </>);
}));

const Element = inject("store")(observer(({ store, product, t }) => {
    return (
        <div className={styles.favorite_elem}>
            <ProductCard data={product} />
            <button
                className={styles.delete_button}
                onClick={() => store.removeFromFavorite(product.id)}
            >{ t("delete") }</button>
        </div>
    );
}));