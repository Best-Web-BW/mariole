import blocks from "../../scss/blocks.module.scss";
import styles from "./edit.module.scss";
import lorem from "../../utils/common/lorem";
import Select from "react-select";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";

export default function Admin() {

    const sortingOptions = [
        { value: "price_0-1", label: "Цена по возрастанию" },
        { value: "price_1-0", label: "Цена по убыванию" },
        { value: "alphabet_A-B", label: "От А до Я" },
        { value: "alphabet_B-A", label: "От Я до А" },
        { value: "time_new", label: "Сначала новое" },
        { value: "time_old", label: "Сначала старое" }
    ]

    const selectTheme = theme => ({
        ...theme, borderRadius: 0,
        colors: { ...theme.colors, primary: "black", neutral0: "transparent" }
    });
    
    const selectStyles = {
        container: () => ({
            width: "50%",
            fontSize: "16px",
            position: "relative"
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

    return (<>
        <Head>
            <title>Mariole</title>
            <meta name="description" content={lorem(100)} />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
        </Head>
        <div className={blocks.content_body}>
            <div className={styles.page}>
                <div className={styles.row}>
                    <h2 className={styles.title}>Загрузите фотографии товара</h2>
                    <form action="" className={styles.form}>
                        <label>
                            <input type="file" name="" id="" className={styles.hidden}/>
                            <button className={styles.add_photo_button}>Загрузить</button>
                        </label>
                    </form>
                    <div className={styles.photo_wrapper}>
                        <div className={styles.photo_elem}>
                            <span className={styles.delete_button}></span>
                            <img src="/images/products/p1.1.jpg" alt=""/>
                        </div>
                        <div className={styles.photo_elem}>
                            <span className={styles.delete_button}></span>
                            <img src="/images/products/p1.1.jpg" alt=""/>
                        </div>
                        <div className={styles.photo_elem}>
                            <span className={styles.delete_button}></span>
                            <img src="/images/products/p1.1.jpg" alt=""/>
                        </div>
                        <div className={styles.photo_elem}>
                            <span className={styles.delete_button}></span>
                            <img src="/images/products/p1.1.jpg" alt=""/>
                        </div>
                        <div className={styles.photo_elem}>
                            <span className={styles.delete_button}></span>
                            <img src="/images/products/p1.1.jpg" alt=""/>
                        </div>
                        <div className={styles.photo_elem}>
                            <span className={styles.delete_button}></span>
                            <img src="/images/products/p1.1.jpg" alt=""/>
                        </div>
                        <div className={styles.photo_elem}>
                            <span className={styles.delete_button}></span>
                            <img src="/images/products/p1.1.jpg" alt=""/>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <h2 className={styles.title}>Параметры товара</h2>
                    <div className={styles.changeLang_container}>
                            <Link href="#">
                                <a className={cn(styles.changeLangBtn, styles.left, styles.active)}>RU</a>
                            </Link>
                            <Link href="#">
                                <a className={cn(styles.changeLangBtn, styles.right)}>EN</a>
                            </Link>
                    </div>
                    <form action="" className={cn(styles.parameters, styles.active)}>
                        <label>
                            Название товара
                            <input type="text"/>
                        </label>
                        <label>
                            Цена товара
                            <input type="text"/>
                        </label>
                        <label>
                            Описание товара
                            <textarea />
                        </label>
                        <label>
                            Состав товара
                            <input type="text"/>
                        </label>
                        <label>
                            Цвет
                            <Select
                            instanceId="sorting_select"
                            isMulti
                            styles={selectStyles}
                            theme={selectTheme}
                            options={sortingOptions}
                        />
                        </label>
                        <label>
                            Размер
                            <Select
                            instanceId="sorting_select"
                            isMulti
                            styles={selectStyles}
                            theme={selectTheme}
                            options={sortingOptions}
                        />
                        </label>
                        <label>
                            Категория
                            <Select
                            instanceId="sorting_select"
                            isMulti
                            styles={selectStyles}
                            theme={selectTheme}
                            options={sortingOptions}
                        />
                        </label>
                        <label>
                            Тип товара
                            <Select
                            instanceId="sorting_select"
                            styles={selectStyles}
                            theme={selectTheme}
                            options={sortingOptions}
                        />
                        </label>
                        <label>
                            Детали и уход
                            <input type="text"/>
                        </label>
                        <label>
                            Родительский товар
                            <Select
                            instanceId="sorting_select"
                            isMulti
                            styles={selectStyles}
                            theme={selectTheme}
                            options={sortingOptions}
                        />
                        </label>
                        <label>
                            Нет в наличии
                            <input type="checkbox" name="" id=""/>
                        </label>
                        <label>
                            Лимитированная коллекция
                            <input type="checkbox" name="" id=""/>
                        </label>
                        <label>
                            Бестселлер
                            <input type="checkbox" name="" id=""/>
                        </label>
                    </form>
                    <form action="" className={styles.parameters}>
                        <label>
                            Название товара (EN)
                            <input type="text"/>
                        </label>
                        <label>
                            Описание товара  (EN)
                            <textarea />
                        </label>
                        <label>
                            Состав товара  (EN)
                            <input type="text"/>
                        </label>
                        <label>
                            Детали и уход (EN)
                            <input type="text"/>
                        </label>
                    </form>
                </div>
                <div className={styles.button_wrapper}>
                    <button className={styles.save}>Сохранить изменения</button>
                    <button className={styles.back}>Отменить</button>
                </div>
            </div>
        </div>
    </>);
}