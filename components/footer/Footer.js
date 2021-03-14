import blocks from "../../scss/blocks.module.scss";
import styles from "./Footer.module.scss";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={cn(styles.logo_block)}>
                <div className={styles.logo_wrapper}>
                    <img src="/images/blocks/logo.png" alt=""/>
                </div>
                <div className={styles.changeLang_wrapper}>
                    <p>Choose your language</p>
                    <div className={styles.changeLang_container}>
                        <Link href="">
                            <a className={cn(styles.changeLangBtn, styles.left, styles.active)}>RU</a>
                        </Link>
                        <Link href="">
                            <a className={cn(styles.changeLangBtn, styles.right)}>EN</a>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={cn(blocks.row, styles.row)}>
                <div className={cn(blocks.column, styles.column)}>
                    <ul>
                        <li><Link href=""><a className={styles.menu_elem}>Главная</a></Link></li>
                        <li><Link href=""><a className={styles.menu_elem}>Магазин</a></Link></li>
                        <li><Link href=""><a className={styles.menu_elem}>Пресса</a></Link></li>
                        <li><Link href=""><a className={styles.menu_elem}>Контакты</a></Link></li>
                    </ul>
                </div>
                <div className={cn(blocks.column, styles.column)}>
                    <ul>
                        <li><Link href=""><a className={styles.menu_elem}>Доставка</a></Link></li>
                        <li><Link href=""><a className={styles.menu_elem}>Оплата</a></Link></li>
                        <li><Link href=""><a className={styles.menu_elem}>Возврат и обмен</a></Link></li>
                        <li><Link href=""><a className={styles.menu_elem}>Таблица размеров</a></Link></li>
                        <li><Link href=""><a className={styles.menu_elem}>Политика конфиденциальности</a></Link></li>
                    </ul>
                </div>
            </div>
            <div className={cn(blocks.row, styles.copyright_block)}>
                <p className={styles.copyright_text}>&#169; Mario'le <span>2021</span> | Все права защищены | Design and template by <Link href=""><a>BestWeb Studio</a></Link></p>
            </div>
        </div>
    );
}