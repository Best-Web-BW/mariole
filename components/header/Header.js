import styles from "./Header.module.scss";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";

export default function Header() {

    
    const [opened, menuOpen] = useState(false); {/*Opening menu*/}
    
    const [active, addActive] = useState(false); {/*Opening submenu*/}

    return (
        <div className={styles.header}>
        <div className={styles.header_container}>
            <div className={styles.icon_container}>
                <div className={styles.menu_icon_container} onClick={() => menuOpen(prev => !prev)}>
                    <div className={styles.menu_icon}></div>
                    <div className={styles.menu_icon}></div>
                    <div className={styles.menu_icon}></div>
                </div>
                <span className={cn(styles.icon, styles.search_icon)}></span>
            </div>
            <div className={styles.logo_container}>
                <Link href="#">
                    <a>Mario'le</a>
                </Link>
            </div>
            <div className={styles.icon_container}>
                <Link href="#">
                    <a className={cn(styles.icon, styles.favorite_icon)}></a>
                </Link>
                <Link href="#">
                    <a className={cn(styles.icon, styles.cart_icon)}></a>
                </Link>
            </div>
        </div>
        {/* menu */}
        <div className={cn(styles.menu, {[styles.opened]: opened} )}>
            <div className={styles.menu_cross_wrapper}>
                <span className={styles.menu_cross} onClick={() => menuOpen(prev => !prev)}/>
            </div>
            <div className={styles.menu_elem_cont}>
                <ul>
                    <li>
                        <Link href="">
                            <a className={styles.menu_elem}>МАГАЗИН</a>
                        </Link>
                        <span className={cn(styles.submenu_icn, {[styles.active]: active})} onClick={() => addActive(prev => !prev)}/>
                    </li>
                    <div className={cn(styles.submenu, {[styles.active]: active})}>
                        <ul>
                            <li>
                                <Link href="">
                                    <a className={styles.menu_elem}>Новинки</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <a className={styles.menu_elem}>Лимитированная коллекция</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <a className={styles.menu_elem}>Трикотаж</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <a className={styles.menu_elem}>Бестселлеры</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <a className={styles.menu_elem}>Украшения</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="">
                                    <a className={styles.menu_elem}>Смотреть всё</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <li>
                        <Link href="">
                            <a className={styles.menu_elem}>О НАС</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a className={styles.menu_elem}>ПРЕССА</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a className={styles.menu_elem}>КОНТАКТЫ</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a className={styles.social_link}></a>
                        </Link>
                    </li>
                    <div className={styles.changeLang_container}>
                        <Link href="">
                            <a className={cn(styles.changeLangBtn, styles.left, styles.active)}>RU</a>
                        </Link>
                        <Link href="">
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