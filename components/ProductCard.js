import styles from "./ProductCard.module.scss";
import Link from "next/link";

export default function ProductCard({ id = 0 }) {
	return (
		<div className={styles.product_card}>
            <div className={styles.outofstock}>нет в наличии</div>
            <Link href="/shop/[id]" as={`/shop/${id}`}>
                <a className={styles.content}>
                    <div className={styles.image}>
                        <img src="/images/products/mario_le-1817.jpg" alt="" />
                    </div>
                    <div className={styles.data_wrapper}>
                        <p className={styles.data}>Название продукта</p>
                        <p className={styles.data}>32.000,00 &#8381;</p>
                    </div>
                </a>
            </Link>
        </div>
    );
}