import isServer from "../utils/common/isServer";
import { useRouter } from "next/router";
import cn from "classnames";

export default function LanguageBlock({ styles }) {
    return (
        <div className={styles.changeLang_container}>
            <Link styles={styles} customStyle={styles.left} toLocale="ru" title="RU" />
            <Link styles={styles} customStyle={styles.right} toLocale="en" title="EN" />
        </div>
    );
}

function Link({ styles, customStyle, toLocale, title }) {
    const router = useRouter();
    const { locale } = router;
    let onClick;
    if(!isServer() && toLocale !== locale) {
        const { defaultLocale, asPath } = router;
        const query = window.location.search;
        const pathname = `${toLocale !== defaultLocale ? `/${toLocale}` : ""}${asPath}${query}`;
        onClick = () => window.location = pathname;
    }
    
    return (
        <span
            onClick={onClick}
            className={cn(
                styles.changeLangBtn,
                customStyle,
                { [styles.active]: toLocale === locale }
            )}
        >{ title }</span>
    );
}