import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductCard from "./ProductCard";

export default inject("store")(observer(function RecentBlock({ store, styles, t, productCard }) {
    const { locale } = useRouter();
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        if(!store.ready) return;
        
        const response = await fetch(`/api/products/cart?locale=${locale}&ids=${store.recent.toString()}`);
        const json = await response.json();
        setProducts(json);
    }, [store.ready, store.recent]);

    return !!products.length && (<>
        <div className={styles.saw_before_title}>
            <h2>{ t("saw_before") }</h2>
        </div>
        <div className={styles.saw_before_wrapper}>
            <div className={styles.saw_before_row}>{
                products.map(product => <ProductCard key={product.id} data={product} t={productCard} />)
            }</div>
        </div>
    </>);
}));