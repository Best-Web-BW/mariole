import ProductCard from "../components/ProductCard";
import blocks from "../scss/blocks.module.scss";
import styles from "./order.module.scss";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";
import Select from "react-select";

const selectTheme = theme => ({
    ...theme, borderRadius: 0,
    colors: { ...theme.colors, primary: "black", neutral0: "transparent" }
});

const selectStyles = {
    container: () => ({
        width: "100%",
        fontSize: "16px"
    }),
    menu: () => ({
        backgroundColor: "whitesmoke",
        position: "absolute",
        width: "calc(100% - 2px)",
        zIndex: "1000",
        border: "1px solid black"
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            color: "#333333",
            backgroundColor: isDisabled ? null : (isSelected ? "#b4b4b4" : (isFocused ? "#cfcfcf" : null)),
        }
    }
}

export default function Order() {

    return (<>
        <div className={blocks.content_body}>
            <div className={cn(blocks.content_block, styles.page)}>            
                <div className={styles.column}>
                    <form className={styles.form} action="">
                        <div className={styles.form_block}>
                            <p className={styles.form_block_title}>1. Адрес доставки</p>
                            <label htmlFor="" className={styles.full_width_label}>
                                Адрес электронной почты
                                <input type="text" name="" id=""/>
                            </label>
                            <label htmlFor="" className={styles.half_width_label}>
                                Имя
                                <input type="text" name="" id=""/>
                            </label>
                            <label htmlFor="" className={styles.half_width_label}>
                                Фамилия
                                <input type="text" name="" id=""/>
                            </label>
                            <label htmlFor="" className={styles.full_width_label}>
                                Адрес
                                <input type="text" name="" id=""/>
                            </label>
                            <label htmlFor="" className={styles.full_width_label}>
                                Город
                                <input type="text" name="" id=""/>
                            </label>
                            <label htmlFor="" className={styles.label_1_3}>
                                Страна
                                <Select
                                styles={selectStyles}
                                theme={selectTheme}
                                />
                            </label>
                            <label htmlFor="" className={styles.label_1_3}>
                                Регион
                                <Select
                                styles={selectStyles}
                                theme={selectTheme}
                                />
                            </label>
                            <label htmlFor="" className={styles.label_1_3}>
                                Почтовый индекс
                                <input type="text"/>
                            </label>
                            <label htmlFor="" className={styles.full_width_label}>
                                Телефон
                                <input type="text" name="" id=""/>
                            </label>
                            <label htmlFor="" className={styles.full_width_label}>
                                <input className={styles.confidantial} type="checkbox" name="" id=""/>
                                <p className={styles.confidantial}>Адрес электронной почты</p>
                            </label>
                            <label htmlFor="" className={styles.full_width_label}>
                                <input className={styles.confidantial} type="checkbox" name="" id=""/>
                                <p className={styles.confidantial}>Да, я хочу получать новости и эксклюзивные предложения</p>
                            </label>
                        </div>
                        <div className={styles.form_block}>
                            <p className={styles.form_block_title}>2. Способ доставки</p>
                            <div htmlFor="" className={cn(styles.full_width_label, styles.delivery)}>
                                <label htmlFor="">
                                <input type="checkbox" name="" id=""/>
                                СDEK
                                </label>
                                <p className={styles.price}>Бесплатно</p>
                            </div>
                            <div htmlFor="" className={cn(styles.full_width_label, styles.delivery)}>
                                <label htmlFor="">
                                <input type="checkbox" name="" id=""/>
                                Курьер
                                </label>
                                <p className={styles.price}>500р</p>
                            </div>
                        </div>
                        <div className={styles.form_block}>
                            <p className={styles.form_block_title}>3. Оплата</p>
                            <label htmlFor="" className={cn(styles.full_width_label, styles.payment)}>
                                <input type="radio" name="" id=""/> Онлайн
                                <br/>
                                <input type="radio" name="" id=""/> Наличными курьеру
                            </label>
                        </div>
                        <div className={styles.form_block}>
                            <button className={styles.pay_button}>Оплатить</button>
                        </div>
                    </form>
                </div>
                <div className={styles.column}>
                    <div className={styles.order_preview}>
                        <div className={styles.product_row}>
                            <div className={styles.col_1}>
                                <img src="/images/products/mario_le-1817.jpg" alt="" width="100%"/>
                                <div className={styles.quantity}>
                                    1
                                </div>
                            </div>
                            <div className={styles.col_2}>
                                НАЗВАНИЕ ТОВАРА / зелёный
                            </div>
                            <div className={styles.col_3}>
                                32.000,00 &#8381;
                            </div>
                        </div>
                        <div className={styles.product_row}>
                            <div className={styles.col_1}>
                                <img src="/images/products/mario_le-1817.jpg" alt="" width="100%"/>
                                <div className={styles.quantity}>
                                    1
                                </div>
                            </div>
                            <div className={styles.col_2}>
                                НАЗВАНИЕ ТОВАРА / зелёный
                            </div>
                            <div className={styles.col_3}>
                                32.000,00 &#8381;
                            </div>
                        </div>
                        <div className={styles.product_row}>
                            <div className={styles.col_1}>
                                <img src="/images/products/mario_le-1817.jpg" alt="" width="100%"/>
                                <div className={styles.quantity}>
                                    1
                                </div>
                            </div>
                            <div className={styles.col_2}>
                                НАЗВАНИЕ ТОВАРА / зелёный
                            </div>
                            <div className={styles.col_3}>
                                32.000,00 &#8381;
                            </div>
                        </div>
                        <div className={styles.data_row}>
                            <p>Промежуточный итог:</p>
                            <p>32.000,00 &#8381;</p>
                        </div>
                        <div className={styles.data_row}>
                            <p>Доставка:</p>
                            <p>Бесплатно</p>
                        </div>
                        <div className={cn(styles.data_row, styles.ammount)}>
                            <p className={styles.ammount_text}>Итого:</p>
                            <p className={styles.ammount_text}>32.000,00 &#8381;</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}