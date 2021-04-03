import formatPrice from "../utils/common/formatPrice";
import styles from "./ProductCard.module.scss";
import Link from "next/link";
import cn from "classnames";

export default function ProductCard({ data: { id, image, name, price, available } = {}, t }) {
	return (
		<div className={styles.product_card}>
            <div className={cn(styles.outofstock, { [styles.hidden]: available })}>{ t("out_of_stock") }</div>
            <Link href="/shop/[id]" as={`/shop/${id}`}>
                <a className={styles.content}>
                    <div className={styles.image}>
                        <img src={image} alt="" />
                    </div>
                    <div className={styles.data_wrapper}>
                        <p className={styles.data}>{ name }</p>
                        <p className={styles.data}>{ formatPrice(price) } &#8381;</p>
                    </div>
                </a>
            </Link>
        </div>
    );
}