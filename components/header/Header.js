import { getMenuItem } from "../MenuItemGenerator";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Link from "next/link";
import cn from "classnames";

export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false);
    const [submenuOpened, setSubmenuOpened] = useState(false);
    const [sticky, setSticky] = useState(false);

    useEffect(() => {
        const handler = () => setSticky(window.scrollY > 0);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <div className={cn(styles.header, { [styles.sticky]: sticky })}>
            <div className={styles.header_container}>
                <div className={styles.icon_container}>
                    <div className={styles.menu_icon_container} onClick={() => setMenuOpened(prev => !prev)}>
                        <div className={styles.menu_icon} />
                        <div className={styles.menu_icon} />
                        <div className={styles.menu_icon} />
                    </div>
                    <span className={cn(styles.icon, styles.search_icon)} />
                </div>
                <div className={styles.logo_container}>
                    <Link href="#">
                        <a>Mario'le</a>
                    </Link>
                </div>
                <div className={styles.icon_container}>
                    <Link href="#">
                        <a className={cn(styles.icon, styles.favorite_icon)}>
                            <div className={cn(styles.icon_indicator, styles.active)}></div>
                        </a>
                    </Link>
                    <Link href="#">
                        <a className={cn(styles.icon, styles.cart_icon)}>
                            <div className={styles.icon_indicator}></div>
                        </a>
                    </Link>
                </div>
            </div>
            {/* menu */}
            <div className={cn(styles.menu, { [styles.opened]: menuOpened })}>
                <div className={styles.menu_cross_wrapper}>
                    <span className={styles.menu_cross} onClick={() => setMenuOpened(prev => !prev)} />
                </div>
                <div className={styles.menu_elem_cont}>
                    <ul>
                        <li>
                            <Link href="/shop">
                                <a className={styles.menu_elem}>МАГАЗИН</a>
                            </Link>
                            <span
                                className={cn(styles.submenu_icn, { [styles.active]: submenuOpened })}
                                onClick={() => setSubmenuOpened(prev => !prev)}
                            />
                        </li>
                        <div className={cn(styles.submenu, { [styles.active]: submenuOpened })}>
                            <ul>
                                <MenuItem href="/shop" title="Новинки" />
                                <MenuItem href="/shop" title="Лимитированная коллекция" />
                                <MenuItem href="/shop" title="Трикотаж" />
                                <MenuItem href="/shop" title="Бестселлеры" />
                                <MenuItem href="/shop" title="Украшения" />
                                <MenuItem href="/shop" title="Смотреть всё" />
                            </ul>
                        </div>
                        <MenuItem href="/about" title="О НАС" />
                        <MenuItem href="/media" title="ПРЕССА" />
                        <MenuItem href="/contacts" title="КОНТАКТЫ" />
                        <li>
                            <Link href="#">
                                <a className={styles.social_link}></a>
                            </Link>
                        </li>
                        <div className={styles.changeLang_container}>
                            <Link href="#">
                                <a className={cn(styles.changeLangBtn, styles.left, styles.active)}>RU</a>
                            </Link>
                            <Link href="#">
                                <a className={cn(styles.changeLangBtn, styles.right)}>EN</a>
                            </Link>
                        </div>
                    </ul>
                </div>
            </div>
            {/* menu end */}
        </div>
    );
}

const MenuItem = getMenuItem(styles.menu_elem);