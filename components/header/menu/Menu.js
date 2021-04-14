import { getMenuItem } from "../../MenuItemGenerator";
import LanguageBlock from "../../LanguageBlock";
import styles from "../Header.module.scss";
import { useMemo, useState } from "react";
import Link from "next/link";
import cn from "classnames";

export default function Menu({ opened, close, t }) {
    const [submenuOpened, setSubmenuOpened] = useState(false);
    const MenuItem = useMemo(() => getMenuItem(styles.menu_elem, close), []);

    return (
        <div className={cn(styles.menu, { [styles.opened]: opened })}>
            <div className={styles.menu_cross_wrapper}>
                <span className={styles.menu_cross} onClick={close} />
            </div>
            <div className={styles.menu_elem_cont}>
                <ul>
                    <li>
                        <Link href="/shop">
                            <a className={styles.menu_elem} onClick={close}>{ t.shop["title-caps"] }</a>
                        </Link>
                        <span
                            className={cn(styles.submenu_icn, { [styles.active]: submenuOpened })}
                            onClick={() => setSubmenuOpened(prev => !prev)}
                        />
                    </li>
                    <div className={cn(styles.submenu, { [styles.active]: submenuOpened })}>
                        <ul>
                            <MenuItem href="/shop?fresh=1" title={t.shop["new"]} />
                            <MenuItem href="/shop?limited=1" title={ t.shop["limited-collection"] } />
                            <MenuItem href="/shop?category=knitwear" title={ t.shop["knitwear"] } />
                            <MenuItem href="/shop?bestseller=1" title={ t.shop["bestsellers"] } />
                            <MenuItem href="/shop?category=accessories" title={ t.shop["accessories"] } />
                            <MenuItem href="/shop?category=jewelry" title={ t.shop["jewelry"] } />
                            <MenuItem href="/shop" title={ t.shop["view-all"] } />
                        </ul>
                    </div>
                    <MenuItem href="/" title={ t["about-us-caps"] } />
                    <MenuItem href="/media" title={ t["media-caps"] } />
                    <MenuItem href="/contacts" title={ t["contacts-caps"] } />
                    <li>
                        <Link href="#">
                            <a className={styles.social_link} />
                        </Link>
                    </li>
                    <LanguageBlock styles={styles} />
                </ul>
            </div>
        </div>
    );
}