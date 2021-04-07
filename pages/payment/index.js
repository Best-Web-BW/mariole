import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Head from "next/head";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["page_payment"]) }
});

export default function Payment() {
    const { t } = useTranslation("page_payment");

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(blocks.content_block, styles.page)}>
            <h2 className={styles.page_title}>{ t("title") }</h2>
            <Data>{ t("data1") }</Data>
            <Data>{ t("data2") }</Data>
            <Data>{ t("data3") }</Data>
            <Data>{ t("data4") }</Data>
            <Data>{ t("data5") }</Data>
            <Data>{ t("data6") }</Data>
            <Data clean>
                <ul>
                    <li>{ t("data7-li1") }</li>
                    <li>{ t("data7-li2") }</li>
                    <li>{ t("data7-li3") }</li>
                    <li>{ t("data7-li4") }</li>
                </ul>
            </Data>
            <Data>
                { t("data8") }
                &nbsp;<a href="tel:+79680018880" className={styles.link}>+7 (968) 001-88-80</a>,
                &nbsp;<a href="tel:+79295005146" className={styles.link}>+7 (929) 500-51-46</a>
            </Data>
            <Data>{ t("data9") }</Data>
        </div>
    </>);
}

function Data({ children, clean = false }) {
    return (
        <div className={styles.data}>
            { clean ? children : <p>{ children }</p> }
        </div>
    );
}