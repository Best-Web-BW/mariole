import styles from "../Header.module.scss";
import Link from "next/link";
import cn from "classnames";
import { inject, observer } from "mobx-react";

export default function Controls({ openMenu, toggleSearch }) {
    return (
        <div className={styles.header_container}>
            <div className={styles.icon_container}>
                <div className={styles.menu_icon_container} onClick={openMenu}>
                    <div className={styles.menu_icon} />
                    <div className={styles.menu_icon} />
                    <div className={styles.menu_icon} />
                </div>
                <span className={cn(styles.icon, styles.search_icon)} onClick={toggleSearch} />
            </div>
            <div className={styles.logo_container}>
                <Link href="/">
                    <a>Mario'le</a>
                </Link>
            </div>
            <div className={styles.icon_container}>
                <FavoriteIcon />
                <CartIcon />
            </div>
        </div>
    );
}

const FavoriteIcon = inject("store")(observer(({ store }) => (
    <Link href="/favorite">
        <a className={cn(styles.icon, styles.favorite_icon)}>
            <div className={cn(
                styles.icon_indicator,
                { [styles.active]: store.favorite.length }
            )} />
        </a>
    </Link>
)));

const CartIcon = inject("store")(observer(({ store }) => (
    <Link href="/cart">
        <a className={cn(styles.icon, styles.cart_icon)}>
            <div className={cn(
                styles.icon_indicator,
                { [styles.active]: store.cart.length }
            )} />
        </a>
    </Link>
)));