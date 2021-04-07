import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Head from "next/head";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["page_privacy-policy"]) }
});

export default function PrivacyPolicy() {
    const { t } = useTranslation("page_privacy-policy");

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(blocks.content_block, styles.page)}>
            <h2 className={styles.page_title}>{ t("subtitle") }</h2>
            <Data title={t("1.0")}>
                <p>{ t("1.0.1") }</p>
                <p>{ t("1.1") }</p>
                <p>{ t("1.2") }</p>
                <p>{ t("1.3") }</p>
            </Data>
            <Data title={t("2.0")}>
                <p>{ t("2.1") }</p>
                <p>{ t("2.1.1") }</p>
                <p>{ t("2.1.2") }</p>
                <p>{ t("2.1.3") }</p>
                <p>{ t("2.2") }</p>
                <p>{ t("2.3") }</p>
            </Data>
            <Data title={t("3.0")}>
                <p>{ t("3.1") }</p>
                <p>{ t("3.2") }</p>
                <p>{ t("3.2.1") }</p>
                <p>{ t("3.2.2") }</p>
                <p>{ t("3.2.3") }</p>
                <p>{ t("3.2.4") }</p>
                <p>{ t("3.2.5") }</p>
                <p>{ t("3.2.6") }</p>
                <p>{ t("3.3") }</p>
            </Data>
            <Data title={t("4.0")}>
                <p>{ t("4.1") }</p>
                <p>{ t("4.2") }</p>
                <p>{ t("4.2.1") }</p>
                <p>{ t("4.2.2") }</p>
                <p>{ t("4.2.3") }</p>
                <p>{ t("4.2.4") }</p>
                <p>{ t("4.2.5") }</p>
                <p>{ t("4.2.6") }</p>
                <p>{ t("4.2.7") }</p>
                <p>{ t("4.3") }</p>
            </Data>
            <Data title={t("5.0")}>
                <p>{ t("5.1") }</p>
                <p>{ t("5.2") }</p>
                <p>{ t("5.3") }</p>
                <p>{ t("5.4") }</p>
                <p>{ t("5.5") }</p>
            </Data>
            <Data title={t("6.0")}>
                <p>{ t("6.1") }</p>
                <p>{ t("6.2") }</p>
                <p>{ t("6.3") }</p>
                <p>{ t("6.4") }</p>
                <p>{ t("6.5") }</p>
            </Data>
            <Data title={t("7.0")}>
                <p>{ t("7.1") }</p>
                <p>{ t("7.2") }</p>
            </Data>
            <Data title={t("8.0")}>
                <p>
                    { t("8.1") }
                    &nbsp;<a href="tel:+79680018880">+7 (968) 001-88-80</a>,
                    &nbsp;<a href="tel:+79295005146">+7 (929) 500-51-46</a>
                    &nbsp;{ t("8.1-email") }
                    &nbsp;<a href="mailto:mariolewool@yandex.ru">Mariolewool@yandex.ru</a>
                </p>
                <p>{ t("8.2") }</p>
                <p>{ t("8.3") }</p>
                <p>{ t("8.4") }</p>
                <p>{ t("8.5") }</p>
            </Data>
        </div>
    </>);
}

function Data({ title, children }) {
    return (
        <div className={styles.data}>
            <h2 className={styles.module_title}>{ title }</h2>
            { children }
        </div>
    );
}