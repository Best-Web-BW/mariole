import { getMenuItem } from "../../MenuItemGenerator";
import styles from "../Header.module.scss";
import { useState } from "react";
import Link from "next/link";
import cn from "classnames";

const MenuItem = getMenuItem(styles.menu_elem);

export default function Menu({ opened, close }) {
    const [submenuOpened, setSubmenuOpened] = useState(false);

    return (
        <div className={cn(styles.menu, { [styles.opened]: opened })}>
            <div className={styles.menu_cross_wrapper}>
                <span className={styles.menu_cross} onClick={close} />
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
                            <MenuItem href="/shop?limited=1" title="Лимитированная коллекция" />
                            <MenuItem href="/shop?category=knitwear" title="Трикотаж" />
                            <MenuItem href="/shop?bestseller=1" title="Бестселлеры" />
                            <MenuItem href="/shop?category=jewelry" title="Украшения" />
                            <MenuItem href="/shop" title="Смотреть всё" />
                        </ul>
                    </div>
                    <MenuItem href="/" title="О НАС" />
                    <MenuItem href="/media" title="ПРЕССА" />
                    <MenuItem href="/contacts" title="КОНТАКТЫ" />
                    <li>
                        <Link href="#">
                            <a className={styles.social_link} />
                        </Link>
                    </li>
                    <LanguageBlock />
                </ul>
            </div>
        </div>
    );
}

function LanguageBlock() {
    return (
        <div className={styles.changeLang_container}>
            <Link href="#">
                <a className={cn(styles.changeLangBtn, styles.left, styles.active)}>RU</a>
            </Link>
            <Link href="#">
                <a className={cn(styles.changeLangBtn, styles.right)}>EN</a>
            </Link>
        </div>
    );
}