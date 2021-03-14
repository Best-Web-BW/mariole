import Head from "next/head";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";
import Select from "react-select";
import blocks from "../scss/blocks.module.scss";
import styles from "./product.module.scss";
import FeedbackForm from "../components/feedbackForm";
import Product from "../components/product_card";

export default function ProductPage() {
    return (
        <div className={blocks.content_body}>
            <div className={styles.product_page}>
                <div className={styles.column}>
                    <div className={styles.slider}>
                        <div className={styles.slider_preview}>
                            <div className={cn(styles.slider_preview_elem, styles.active)}>
                                <img src="/images/products/p1.1.jpg" alt="" width="100%"/>
                            </div>
                            <div className={cn(styles.slider_preview_elem)}>
                                <img src="/images/products/p1.2.jpg" alt="" width="100%"/>
                            </div>
                        </div>
                        <div className={styles.slider_view}>
                            <img src="/images/products/p1.1.jpg" alt="" width="100%"/>
                        </div>
                    </div>
                </div>
                <div className={styles.column}>
                    <div className={styles.product_data}>
                        <div className={styles.data_row}>
                            <h2>НАЗВАНИЕ ТОВАРА / ЦВЕТ</h2>
                        </div>
                        <div className={styles.data_row}>
                            <p className={styles.price}>32.000,00 &#8381;</p>
                        </div>
                        <div className={styles.data_row}>
                            <p>Количество</p>
                            <div className={styles.choose_quantity}>
                                <button>-</button>
                                <span>26</span>
                                <button>+</button>
                            </div>
                            <p>Цвет</p>
                            <div className={styles.choose_color_wrapper}>
                                <div className={cn(styles.choose_color_elem, styles.active)}>
                                    <div className={styles.img_wrapper}>
                                        <img src="/images/products/p1.1.jpg" alt="" width="100%"/>
                                    </div>
                                    <div className={styles.popup}>
                                        зеленый
                                    </div>
                                </div>
                                <div className={cn(styles.choose_color_elem)}>
                                    <div className={styles.img_wrapper}>
                                        <img src="/images/products/black.jpg" alt="" width="100%"/>
                                    </div>
                                    <div className={styles.popup}>
                                        черный
                                    </div>
                                </div>
                                <div className={cn(styles.choose_color_elem)}>
                                    <div className={styles.img_wrapper}>
                                        <img src="/images/products/red.jpg" alt="" width="100%"/>
                                    </div>
                                    <div className={styles.popup}>
                                        красный
                                    </div>   
                                </div>
                            </div>
                            <p>Размер</p>
                            <div className={styles.choose_size_wrapper}>
                                <div className={cn(styles.choose_size_elem, styles.active)}>
                                    M
                                </div>
                                <div className={styles.choose_size_elem}>
                                    S
                                </div>
                                <div className={cn(styles.choose_size_elem, styles.disabled)}>
                                    L
                                </div>
                            </div>
                        </div>
                        <div className={styles.data_row}>
                            <button className={styles.add_to_cart}>ДОБАВИТЬ В КОРЗИНУ</button>
                            <button className={cn(styles.add_to_favorite, styles.active)}><span className={styles.favorite_icon}></span> ДОБАВИТЬ В ИЗБРАННОЕ</button>
                        </div>
                        <div className={cn(styles.data_row, styles.padding)}>
                            <p>Небольшое описание товара словами</p>
                        </div>
                        <div className={cn(styles.data_row, styles.padding)}>
                            <p>Цвет: Розовый</p>
                            
                        </div>
                        <div className={cn(styles.data_row, styles.more_info_wrapper)}>
                            <button className={cn(styles.show_more, styles.active)}>Состав <span className={styles.show_more_icn}></span></button>
                            <div className={styles.info}>
                                Основа: 100% вискоза. Подклад: 100% вискоза.
                            </div>
                        </div>
                        <div className={cn(styles.data_row, styles.more_info_wrapper)}>
                            <button className={styles.show_more}>Детали и уход <span className={styles.show_more_icn}></span></button>
                            <div className={styles.info}>
                                Рост модели 173 см, размер XS (40 RUS). На модели: жакет размера S (42 RUS). Рекомендуется только сухая чистка.
                            </div>
                        </div>
                        <div className={cn(styles.data_row, styles.more_info_wrapper)}>
                            <button className={cn(styles.show_more, styles.active)}>Таблица размеров <span className={styles.show_more_icn}></span></button>
                            <div className={cn(styles.info, styles.opened)}>
                                <table>
                                    <tr>
                                        <td className={styles.row_title}>Mario'le</td>
                                        <td className={styles.col_title}>XS</td>
                                        <td className={styles.col_title}>S</td>
                                        <td className={styles.col_title}>M</td>
                                        <td className={styles.col_title}>L</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.row_title}>Объем груди (см)</td>
                                        <td>84</td>
                                        <td>88</td>
                                        <td>92</td>
                                        <td>96</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.row_title}>Объем талии (см)</td>
                                        <td>64</td>
                                        <td>68</td>
                                        <td>72</td>
                                        <td>76</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.row_title}>Объем бедер (см)</td>
                                        <td>88</td>
                                        <td>92</td>
                                        <td>96</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.row_title}>Италия</td>
                                        <td>38</td>
                                        <td>40</td>
                                        <td>42</td>
                                        <td>44</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.row_title}>Франция</td>
                                        <td>36</td>
                                        <td>38</td>
                                        <td>40</td>
                                        <td>42</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div className={cn(styles.data_row, styles.more_info_wrapper)}>
                            <button className={cn(styles.show_more, styles.active)}>Задать вопрос<span className={styles.show_more_icn}></span></button>
                            <div className={cn(styles.info, styles.opened)}>
                                <FeedbackForm />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className={styles.photo_modal}>
                <div className={styles.photo_modal_content}>
                    <div className={styles.img_wrapper}>
                        <img src="/images/products/p1.2.jpg" alt="" width="100%"/>
                    </div>
                    <div className={styles.modal_navigation}>
                        <div className={cn(styles.navigation_button)}>
                            <span className={styles.back}></span>
                        </div>
                        <div className={cn(styles.navigation_button)}>
                            <span className={styles.close}></span>
                        </div>
                        <div className={cn(styles.navigation_button)}>
                            <span className={styles.next}></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={blocks.content_block}>
                <div className={styles.sow_before_title}>
                    <h2>ВЫ СМОТРЕЛИ:</h2>
                </div>
                <div className={styles.sow_before_wrapper}>
                    
                    <div className={styles.sow_before_row}>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                    </div>
                </div>
            </div>
        </div>
    )
}