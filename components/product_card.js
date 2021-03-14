import styles from "./product_block.module.scss";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";

export default function ProductCard() {
	return (<>
		<div className={styles.product_card}>
            <div className={styles.outofstock}>
                 нет в наличии
            </div>
            <Link href="/product">
                <a className={styles.content}>
                    <div className={styles.image}>
                        <img src="/images/products/mario_le-1817.jpg" alt=""/>
                    </div>
                    <div className={styles.data_wrapper}>
                        <p className={styles.data}>Название продукта</p>
                        <p className={styles.data}>32.000,00 &#8381;</p>
                    </div>
                </a>
            </Link>
        </div>
    </>);
}