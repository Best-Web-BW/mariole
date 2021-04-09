import { getMenuItem } from "../MenuItemGenerator";
import blocks from "../../scss/blocks.module.scss";
import LanguageBlock from "../LanguageBlock";
import styles from "./Footer.module.scss";
import cn from "classnames";

const MenuItem = getMenuItem(styles.menu_elem);

export default function Footer({ t }) {
    return (
        <div className={styles.footer}>
            <div className={cn(styles.logo_block)}>
                <div className={styles.logo_wrapper}>
                    <img src="/images/blocks/logo.webp" alt="" />
                </div>
                <div className={styles.changeLang_wrapper}>
                    <p>Choose your language</p>
                    <LanguageBlock styles={styles} />
                </div>
            </div>
            <div className={cn(blocks.row, styles.row)}>
                <div className={cn(blocks.column, styles.column)}>
                    <ul>
                        <MenuItem href="/" title={t.menu["main"]} />
                        <MenuItem href="/shop" title={t.menu["shop"]} />
                        <MenuItem href="/media" title={t.menu["media"]} />
                        <MenuItem href="/contacts" title={t.menu["contacts"]} />
                    </ul>
                </div>
                <div className={cn(blocks.column, styles.column)}>
                    <ul>
                        <MenuItem href="/shipping" title={t.menu["shipping"]} />
                        <MenuItem href="/payment" title={t.menu["payment"]} />
                        <MenuItem href="/return-and-exchange" title={t.menu["return-and-exchange"]} />
                        <MenuItem href="/size-table" title={t.menu["size-table"]} />
                        <MenuItem href="/privacy-policy" title={t.menu["privacy-policy"]} />
                    </ul>
                </div>
            </div>
            <div className={cn(blocks.row, styles.copyright_block)}>
                <p className={styles.copyright_text}>
                    &#169; Mario'le <span>2021</span> | { t["all-rights-reserved"] } | Design and template by <a href="https://reginleif.tech">Reginleif</a>
                </p>
            </div>
        </div>
    );
}