import ProductCard from "../components/ProductCard";
import blocks from "../scss/blocks.module.scss";
import { inject, observer } from "mobx-react";
import styles from "./favorite.module.scss";
import { useEffect, useState } from "react";
import cn from "classnames";

export default inject("store")(observer(function Favorite({ store }) {
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const response = await fetch(`/api/products?ids=${store.favorite.toString()}`);
        const json = await response.json();
        console.log({ json, setProducts });
        setProducts(json);
    }, [store.favorite]);

    return (
        <div className={cn(blocks.main_block, styles.page)}>
            <h2 className={cn(blocks.block_title, styles.title)}>Избранное</h2>
            <div className={styles.favorite_row}>{
                products.map(product => <Element key={product.id} product={product} />)
            }</div>
        </div>
    );
}));

const Element = inject("store")(observer(({ store, product }) => {
    return (
        <div className={styles.favorite_elem}>
            <ProductCard data={product} />
            <button
                className={styles.delete_button}
                onClick={() => store.removeFromFavorite(product.id)}
            >Удалить</button>
        </div>
    );
}));