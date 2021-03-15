import Head from "next/head";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";
import Select from "react-select";
import blocks from "../scss/blocks.module.scss";
import styles from "./shop.module.scss";
import Product from "../components/product_card";

export default function Shop() {

    const sortingOptions = [
        { value: 'Ascending price', label: 'Цена по возрастанию' },
        { value: 'Descending price', label: 'Цена по убыванию' },
        { value: 'From A to Z', label: 'От А до Я' },
        { value: 'From Z to A', label: 'От Я до А' },
        { value: 'New first', label: 'Сначала новое' },
        { value: 'Old first', label: 'Сначала старое' }
    ]

    const selectTheme = theme => ({
        ...theme, borderRadius: 0,
        colors: { ...theme.colors, primary: "black", neutral0: "transparent" }
    });

    const SelectStyle = {
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

    return (<>
         <Head>
            <title>Mariole</title>
            <meta name="description" content={`
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                In blandit turpis non tincidunt semper. Nulla ut lorem fringilla, 
                accumsan dolor non, luctus lacus. Aliquam a tempor arcu. 
                Sed auctor, ex vel interdum consectetur, justo nisl malesuada 
                mauris, at cursus tortor nulla ut mi. Suspendisse convallis, 
                diam a lobortis tempus, lectus nunc laoreet metus, vel dignissim 
                nibh arcu in ligula. Aenean ac aliquet tellus, eget vestibulum neque. 
                Mauris dui tortor, lobortis at leo eu, gravida pellentesque tellus. 
                In iaculis nunc interdum sagittis hendrerit. Etiam faucibus dui et sapien 
                dictum, nec aliquam nibh pulvinar. Donec vehicula sem dolor, a ornare dui eleifend.
            `} />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
        </Head>
        <div className={blocks.content_body}>
            <div className={cn(blocks.main_block, styles.first_block)}>
                <img src="/images/blocks/mario_le-2077.jpg" alt="" className={blocks.desktop}/>
                <img src="/images/blocks/mario_le-1817.jpg" alt="" className={blocks.mobile} width="100%"/>
                <div className={blocks.page_title}>
                    <p>ВСЕ ТОВАРЫ</p>
                </div>
            </div>
            <div className={cn(blocks.content_block, styles.shop_page)}>
                <div className={cn(styles.menu_wrapper)}>
                    <div className={styles.menu_container}>
                        <ul>
                            <li>
                                <div className={styles.menu_elem}>
                                <span className={cn(styles.submenu_icn, styles.active)}/>
                                КАТЕГОРИЯ
                                </div>
                                <div className={cn(styles.submenu_container, styles.opened)}>
                                    <ul>
                                        <li>
                                            <span className={cn(styles.submenu_icn)}/>
                                            <Link href="">
                                                <a className={styles.menu_elem}>Трикотаж</a>
                                            </Link>
                                            <div className={cn(styles.submenu_container, styles.opened)}>
                                                <ul>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Костюмы</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Водолазки</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Кардиганы</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        
                                        <li>
                                            <span className={cn(styles.submenu_icn)}/>
                                            <Link href="">
                                                <a className={styles.menu_elem}>Аксессуары</a>
                                            </Link>
                                            <div className={styles.submenu_container}>
                                                <ul>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Варежки</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Перчатки</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Носки</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Косынки</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Платки</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Палантины</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Головные уборы</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        
                                        <li>
                                            <span className={cn(styles.submenu_icn)}/>
                                            <Link href="">
                                                <a className={styles.menu_elem}>Украшения</a>
                                            </Link>
                                            <div className={styles.submenu_container}>
                                                <ul>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Колье</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Серьги</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Браслеты</a>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="">
                                                            <a className={styles.menu_elem}>Броши</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                        
                                        <li>
                                            <Link href="">
                                                <a className={styles.menu_elem}>Лимитированная коллекция </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a className={styles.menu_elem}>Бестселлеры</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            
                            <li>
                                <div className={styles.menu_elem}>
                                    <span className={cn(styles.submenu_icn)}/>
                                    РАЗМЕР
                                </div>
                                <div className={cn(styles.submenu_container, styles.opened)}>
                                    <ul>
                                        <li>
                                            <Link href="">
                                                <a className={cn(styles.menu_elem, styles.active, styles.size)}>
                                                    <div className={styles.size_elem}></div>
                                                    L
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a className={cn(styles.menu_elem, styles.size)}>
                                                    <div className={styles.size_elem}></div>
                                                    M
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a className={cn(styles.menu_elem, styles.size)}>
                                                    <div className={styles.size_elem}></div>
                                                    S
                                                </a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="">
                                                <a className={cn(styles.menu_elem, styles.size)}>
                                                    <div className={styles.size_elem}></div>
                                                    XS
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>  
                <div className={styles.shop_wrapper}>
                    <div className={cn(styles.row, styles.shop_header)}>
                        <div className={cn(styles.shop_settings, styles.mobile)}>
                            <span className={styles.settings_icn}></span>
                        </div>
                        <div className={styles.select_wrapper}>
                            <Select
                                styles={SelectStyle}
                                theme={selectTheme}
                                options={sortingOptions}
                            />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                    </div>
                    <div className={styles.row}>
                        <Product/>
                        <Product/>
                        <Product/>
                        <Product/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}