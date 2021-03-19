import ProductCard from "../components/ProductCard";
import blocks from "../scss/blocks.module.scss";
import styles from "./favorite.module.scss";
import cn from "classnames";

export default function Favorite() {
    return (
        <div className={cn(blocks.main_block, styles.page)}>
            <h2 className={cn(blocks.block_title, styles.title)}>Избранное</h2>
            <div className={styles.favorite_row}>
                <div className={styles.favorite_elem}>
                    <ProductCard />
                    <button className={styles.delete_button}>Удалить</button>
                </div>
                <div className={styles.favorite_elem}>
                    <ProductCard />
                    <button className={styles.delete_button}>Удалить</button>
                </div>
                <div className={styles.favorite_elem}>
                    <ProductCard />
                    <button className={styles.delete_button}>Удалить</button>
                </div>
                <div className={styles.favorite_elem}>
                    <ProductCard />
                    <button className={styles.delete_button}>Удалить</button>
                </div>
            </div>
        </div>
    );
}