import { getMenuItem } from "../MenuItemGenerator";
import blocks from "../../scss/blocks.module.scss";
import styles from "./Footer.module.scss";
import Link from "next/link";
import cn from "classnames";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={cn(styles.logo_block)}>
                <div className={styles.logo_wrapper}>
                    <img src="/images/blocks/logo.png" alt="" />
                </div>
                <div className={styles.changeLang_wrapper}>
                    <p>Choose your language</p>
                    <div className={styles.changeLang_container}>
                        <Link href="#">
                            <a className={cn(styles.changeLangBtn, styles.left, styles.active)}>RU</a>
                        </Link>
                        <Link href="#">
                            <a className={cn(styles.changeLangBtn, styles.right)}>EN</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={cn(blocks.row, styles.row)}>
                <div className={cn(blocks.column, styles.column)}>
                    <ul>
                        <MenuItem href="/" title="Главная" />
                        <MenuItem href="/shop" title="Магазин" />
                        <MenuItem href="/media" title="Пресса" />
                        <MenuItem href="/contacts" title="Контакты" />
                    </ul>
                </div>
                <div className={cn(blocks.column, styles.column)}>
                    <ul>
                        <MenuItem href="/shipping" title="Доставка" />
                        <MenuItem href="/payment" title="Оплата" />
                        <MenuItem href="/return-and-exchange" title="Возврат и обмен" />
                        <MenuItem href="/size-table" title="Таблица размеров" />
                        <MenuItem href="/privacy-policy" title="Политика конфиденциальности" />
                    </ul>
                </div>
            </div>
            <div className={cn(blocks.row, styles.copyright_block)}>
                <p className={styles.copyright_text}>
                    &#169; Mario'le <span>2021</span> | Все права защищены | Design and template by <Link href="#">
                        <a>BestWeb Studio</a>
                    </Link>
                </p>
            </div>
        </div>
    );
}

const MenuItem = getMenuItem(styles.menu_elem);