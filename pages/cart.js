import ProductCard from "../components/ProductCard";
import blocks from "../scss/blocks.module.scss";
import styles from "./cart.module.scss";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";


export default function Cart() {

    return (<>
        <div className={blocks.content_body}>
            <div className={blocks.content_block}>

                <div className={styles.content}>
                    <h2>
                        КОРЗИНА
                    </h2>
                    {/* <div className={styles.empty_cart}>
                        <p>Ваша корзина пуста</p>
                        <br/>
                        <Link href="/shop"><a>Продолжить покупки</a></Link>
                    </div> */}
                    <div className={cn(styles.data_row, styles.desktop)}>
                        <p className={styles.col_2}>Цена</p>
                        <p className={styles.col_3}>Количество</p>
                        <p className={styles.col_4}>Итого</p>
                    </div>
                    <div className={styles.product_row}>
                        <div className={styles.product_photo}>
                            <img src="/images/products/mario_le-1817.jpg" alt="" width="100%"/>
                        </div>
                        <div className={styles.product_name}>
                            <Link href="">
                                <a>НАЗВАНИЕ ТОВАРА / зелёный</a>
                            </Link>
                            <p className={styles.size}>M</p>
                            <button className={styles.delete_button}>Удалить</button>
                        </div>
                        <div className={styles.col_2}>
                            <p>32.000,00 &#8381;</p>
                        </div>
                        <div className={styles.col_3}>
                            <div className={styles.choose_quantity}>
                                <input type="number" name="" id=""/>
                            </div>
                        </div>
                        <div className={styles.col_4}>
                            <p>32.000,00 &#8381;</p>
                        </div>
                    </div>
                    <div className={styles.ammount_row}>
                        <p className={styles.col_1}>ПРОМЕЖУТОЧНЫЙ ИТОГ</p>
                        <p className={styles.col_2}>32.000,00 &#8381;</p>
                        <p className={styles.col_3}>Стоимость доставки будет учтена при оформлении заказа.</p>
                    </div>
                    <Link href="/order">
                        <button className={styles.order_button}>ОФОРМИТЬ ЗАКАЗ</button>
                    </Link>
                </div>
                <div className={styles.saw_before_title}>
                    <h2>ВЫ СМОТРЕЛИ:</h2>
                </div>
                <div className={styles.saw_before_wrapper}>
                    <div className={styles.saw_before_row}>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>
            </div>
        </div>
    </>)
}