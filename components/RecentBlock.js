import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default inject("store")(observer(function RecentBlock({ store, styles }) {
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const response = await fetch(`/api/products?ids=${store.recent.toString()}`);
        const json = await response.json();
        setProducts(json);
    }, [store.recent]);

    return (<>
        <div className={styles.saw_before_title}>
            <h2>ВЫ СМОТРЕЛИ:</h2>
        </div>
        <div className={styles.saw_before_wrapper}>
            <div className={styles.saw_before_row}>{
                products.map(product => <ProductCard key={product.id} data={product} />)
            }</div>
        </div>
    </>);
}));