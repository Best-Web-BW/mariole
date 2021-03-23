import { getMenuItem } from "../components/MenuItemGenerator";
import ProductCard from "../components/ProductCard";
import blocks from "../scss/blocks.module.scss";
import styles from "./shop.module.scss";
import lorem from "../utils/lorem";
import Select from "react-select";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";

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

export default function Shop() {
    const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

    return (<>
        <div className={cn(blocks.main_block, styles.first_block)}>
            <img className={blocks.desktop} src="/images/blocks/mario_le-2077.jpg" alt="" />
            <img className={blocks.mobile} src="/images/blocks/mario_le-1817.jpg" alt="" width="100%" />
            <div className={blocks.page_title}>
                <p>ВСЕ ТОВАРЫ</p>
            </div>
        </div>
        <div className={styles.search_results}>
            <div className={styles.search_title}>
                <h2>Результаты поиска</h2>
            </div>
            <form action="" className={styles.search_form}>
                <input type="text"/>
                <button type="submit" className={styles.search_button}><span className={styles.search_icn}/></button>
            </form>
        </div>
        <div className={cn(blocks.content_block, styles.shop_page)}>
            <div className={cn(styles.menu_wrapper, { [styles.opened]: mobileMenuOpened })}>
                <div className={cn(styles.menu_cross_wrapper)}>
                    <span className={cn(styles.menu_cross)} />
                </div>
                <div className={styles.menu_container}>
                    <ul>
                        <MenuFilterFunction title="КАТЕГОРИЯ">
                            <SubmenuFilterFunction href="/shop" title="Трикотаж">
                                <MenuItem href="/shop" title="Костюмы" />
                                <MenuItem href="/shop" title="Водолазки" />
                                <MenuItem href="/shop" title="Кардиганы" />
                            </SubmenuFilterFunction>
                            <SubmenuFilterFunction href="/shop" title="Аксессуары">
                                <MenuItem href="/shop" title="Варежки" />
                                <MenuItem href="/shop" title="Перчатки" />
                                <MenuItem href="/shop" title="Носки" />
                                <MenuItem href="/shop" title="Косынки" />
                                <MenuItem href="/shop" title="Платки" />
                                <MenuItem href="/shop" title="Палантины" />
                                <MenuItem href="/shop" title="Головные уборы" />
                            </SubmenuFilterFunction>
                            <SubmenuFilterFunction href="/shop" title="Аксессуары">
                                <MenuItem href="/shop" title="Колье" />
                                <MenuItem href="/shop" title="Серьги" />
                                <MenuItem href="/shop" title="Браслеты" />
                                <MenuItem href="/shop" title="Броши" />
                            </SubmenuFilterFunction>
                            <MenuItem href="/shop" title="Лимитированная коллекция" />
                            <MenuItem href="/shop" title="Бестселлеры" />
                        </MenuFilterFunction>
                        <MenuFilterFunction title="РАЗМЕР">
                            <SizeItem active title="L" />
                            <SizeItem title="M" />
                            <SizeItem title="S" />
                            <SizeItem title="XS" />
                        </MenuFilterFunction>
                    </ul>
                </div>
            </div>  
            <div className={styles.shop_wrapper}>
                <div className={cn(styles.row, styles.shop_header)}>
                    <div className={cn(styles.shop_settings, styles.mobile)}>
                        <span
                            className={styles.settings_icn}
                            onClick={() => setMobileMenuOpened(true)}
                        />
                    </div>
                    <div className={styles.select_wrapper}>
                        <Select
                            instanceId="sorting_select"
                            styles={selectStyles}
                            theme={selectTheme}
                            options={sortingOptions}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <div className={styles.row}>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    </>);
}

const MenuItem = getMenuItem(styles.menu_elem);

function SizeItem({ active, title }) {
    return (
        <li>
            <Link href="#">
                <a className={cn(styles.menu_elem, styles.size, { [styles.active]: active })}>
                    <div className={styles.size_elem} />
                    { title }
                </a>
            </Link>
        </li>
    );
}

function FilterFunction({ children, content }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <li>
            <div className={styles.menu_elem} onClick={() => setExpanded(prev => !prev)}>
                <span className={cn(styles.submenu_icn, { [styles.active]: expanded })} />
                { children }
            </div>
            <div className={cn(styles.submenu_container, { [styles.opened]: expanded })}>
                <ul>{ content }</ul>
            </div>
        </li>
    );
}

function MenuFilterFunction({ title, children }) {
    return <FilterFunction content={children}>{ title }</FilterFunction>;
}

function SubmenuFilterFunction({ href, title, children }) {
    return (
        <FilterFunction content={children}>
            <Link href={href}>
                <a className={styles.menu_elem}>{ title }</a>
            </Link>
        </FilterFunction>
    );
}