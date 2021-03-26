import styles from "../Header.module.scss";
import Link from "next/link";
import cn from "classnames";
import { useEffect, useState } from "react";
import formatPrice from "../../../utils/common/formatPrice";
import { useRouter } from "next/router";

export default function Search({ opened, close }) {
    const [text, setText] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(async () => {
        if(text.length > 0) {
            const response = await fetch(`/api/products?search=${text}`);
            const json = await response.json();
            setProducts(json.slice(0, 5));
        }
    }, [text]);

    const router = useRouter();

    return (
        <div className={cn(styles.search_wrapper, { [styles.opened]: opened })}>
            <form className={styles.form} onSubmit={evt => {
                evt.preventDefault();
                if(text.length > 0) {
                    close();
                    router.push(({ pathname: "/shop", query: { search: text } }));
                }
            }}>
                <span className={styles.close} onClick={close} />
                <input
                    className={styles.input} type="text" name="search" autoComplete="off"
                    value={text} onChange={({ target: { value } }) => setText(value)}
                />
                <label>
                    <button type="submit" className={styles.submite} />
                </label>
                <div className={cn(styles.results_container, { [styles.active]: text.length > 0 })}>
                    <div className={styles.results_list}>
                        <p className={cn({ [styles.hidden]: products.length })}>
                            По вашему запросу ничего не нашлось
                        </p>
                        {/* <div className={styles.results_row}>
                            <p className={styles.results_title}>Популярные предложения</p>
                            <ul>
                                <li>
                                    <Link href="#">
                                        <a>результат</a>
                                    </Link>
                                </li>
                            </ul>
                        </div> */}
                        <div className={cn(styles.results_row, { [styles.hidden]: !products.length })}>
                            <p className={styles.results_title}>Товары</p>
                            <ul>{
                                products.map(product => (
                                    <ProductCard key={product.id} {...product} close={close} />
                                ))
                            }</ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

function ProductCard({ id, image, name, price, close }) {
    return (
        <li onClick={close}>
            <Link href={`/shop/${id}`}>
                <a>
                    <div className={styles.results_product}>
                        <div className={styles.img}>
                            <img src={image} alt="" />
                        </div>
                        <div className={styles.product_param}>
                            <p>{ name }</p>
                            <p>{ formatPrice(price) } &#8381;</p>
                        </div>
                    </div>
                </a>
            </Link>
        </li>
    );
}