import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Head from "next/head";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["page_shipping"]) }
});

export default function Shipping() {
    const { t } = useTranslation("page_shipping");

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(blocks.content_block, styles.page)}>
            <h2 className={styles.page_title}>{ t("delivery-policy") }</h2>
            <div className={styles.attention}>
                <Data>{ t("data1") }</Data>
            </div>
            <Data>{ t("data2") }</Data>
            <Data>{ t("data3") }</Data>
            <Data>{ t("data4") }</Data>
            <Data>{ t("data5") }</Data>
            <Data>{ t("data6") }</Data>
            <Data>{ t("data7") }</Data>
            <Data>{ t("data8") }</Data>
            <Data>{ t("data9") }</Data>
            <Data>
                { t("data10-1") }
                &nbsp;<a className={styles.link} href="tel:+79680018880">+7 (968) 001-88-80</a>,
                &nbsp;<a className={styles.link} href="tel:+79295005146">+7 (929) 500-51-46</a>
                &nbsp;{ t("data10-2") }
                &nbsp;<a className={styles.link} href="mailto:mariolewool@yandex.ru">Mariolewool@yandex.ru</a>
                &nbsp;{ t("data10-3") }
            </Data>
        </div>
    </>);
}

function Data({ children }) {
    return (
        <div className={styles.data}>
            <p>{ children }</p>
        </div>
    );
}