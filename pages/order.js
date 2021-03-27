import blocks from "../scss/blocks.module.scss";
import styles from "./order.module.scss";
import Select from "react-select";
import cn from "classnames";

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
    return (
        <div className={cn(blocks.content_block, styles.page)}>            
            <div className={styles.column}>
                <form className={styles.form} onSubmit={e => {
                    e.preventDefault();
                    console.log(e);
                }}>
                    <div className={styles.form_block}>
                        <p className={styles.form_block_title}>1. Адрес доставки</p>
                        <label className={styles.full_width_label}>
                            Адрес электронной почты
                            <input type="text" name="email" autoComplete="email" />
                        </label>
                        <label className={styles.half_width_label}>
                            Имя
                            <input type="text" name="name.first" autoComplete="given-name" />
                        </label>
                        <label className={styles.half_width_label}>
                            Фамилия
                            <input type="text" name="name.last" autoComplete="family-name" />
                        </label>
                        <label className={styles.full_width_label}>
                            Адрес
                            <input type="text" name="" />
                        </label>
                        <label className={styles.full_width_label}>
                            Город
                            <input type="text" name="" />
                        </label>
                        <label className={styles.label_1_3}>
                            Страна
                            <Select
                                instanceId="country_select"
                                styles={selectStyles}
                                theme={selectTheme}
                            />
                        </label>
                        <label className={styles.label_1_3}>
                            Регион
                            <Select
                                instanceId="region_select"
                                styles={selectStyles}
                                theme={selectTheme}
                            />
                        </label>
                        <label className={styles.label_1_3}>
                            Почтовый индекс
                            <input type="text" name="" />
                        </label>
                        <label className={styles.full_width_label}>
                            Телефон
                            <input type="text" name="phone" autoComplete="tel" />
                        </label>
                        <label className={styles.full_width_label}>
                            <input className={styles.confidantial} type="checkbox" name="only_email" />
                            <p className={styles.confidantial}>Адрес электронной почты</p>
                        </label>
                        <label className={styles.full_width_label}>
                            <input className={styles.confidantial} type="checkbox" name="subscribe" />
                            <p className={styles.confidantial}>
                                Да, я хочу получать новости и эксклюзивные предложения
                            </p>
                        </label>
                    </div>
                    <div className={styles.form_block}>
                        <p className={styles.form_block_title}>2. Способ доставки</p>
                        <div className={cn(styles.full_width_label, styles.delivery)}>
                            <label>
                                <input type="radio" name="delivery" />
                                СDEK
                            </label>
                            <p className={styles.price}>Бесплатно</p>
                        </div>
                        <div className={cn(styles.full_width_label, styles.delivery)}>
                            <label>
                                <input type="radio" name="delivery" />
                                Курьер
                            </label>
                            <p className={styles.price}>500р</p>
                        </div>
                    </div>
                    <div className={styles.form_block}>
                        <p className={styles.form_block_title}>3. Оплата</p>
                        <label className={cn(styles.full_width_label, styles.payment)}>
                            <input type="radio" name="payment" /> Онлайн
                            <br />
                            <input type="radio" name="payment" /> Наличными курьеру
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
                            <img src="/images/products/mario_le-1817.jpg" alt="" width="100%" />
                            <div className={styles.quantity}>1</div>
                        </div>
                        <div className={styles.col_2}>НАЗВАНИЕ ТОВАРА / зелёный</div>
                        <div className={styles.col_3}>32.000,00 &#8381;</div>
                    </div>
                    <div className={styles.product_row}>
                        <div className={styles.col_1}>
                            <img src="/images/products/mario_le-1817.jpg" alt="" width="100%" />
                            <div className={styles.quantity}>1</div>
                        </div>
                        <div className={styles.col_2}>НАЗВАНИЕ ТОВАРА / зелёный</div>
                        <div className={styles.col_3}>32.000,00 &#8381;</div>
                    </div>
                    <div className={styles.product_row}>
                        <div className={styles.col_1}>
                            <img src="/images/products/mario_le-1817.jpg" alt="" width="100%" />
                            <div className={styles.quantity}>1</div>
                        </div>
                        <div className={styles.col_2}>НАЗВАНИЕ ТОВАРА / зелёный</div>
                        <div className={styles.col_3}>32.000,00 &#8381;</div>
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
    );
}