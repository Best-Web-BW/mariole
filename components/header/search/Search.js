import styles from "../Header.module.scss";
import Link from "next/link";
import cn from "classnames";

export default function Search({ opened, close }) {
    return (
        <div className={cn(styles.search_wrapper, { [styles.opened]: opened })}>
            <form className={styles.form} onSubmit={e => e.preventDefault()}>
                <span className={styles.close} onClick={close} />
                <input type="text" className={styles.input} />
                <label htmlFor="">
                    <button type="submit" className={styles.submite} />
                </label>
                <div className={cn(styles.results_container, styles.active)}>
                    <div className={styles.results_list}>
                        <div className={styles.results_row}>
                            <p className={styles.results_title}>Популярные предложения</p>
                            <ul>
                                <li>
                                    <Link href="#">
                                        <a>результат</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a>результат</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#">
                                        <a>результат</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.results_row}>
                            <p className={styles.results_title}>Товары</p>
                            <ul>
                                <li>
                                    <Link href="#">
                                        <a>
                                            <div className={styles.results_product}>
                                                <div className={styles.img}>
                                                    <img src="/images/products/p1.1.jpg" alt="" />
                                                </div>
                                                <div className={styles.product_param}>
                                                    <p>Название товара</p>
                                                    <p>32.000 &#8381;</p>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}