import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import StylableSizeTable from "../components/StylableSizeTable";
import { content_block } from "../scss/blocks.module.scss";
import { useTranslation } from "react-i18next";
import styles from "./size-table.module.scss";
import Head from "next/head";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["size-table"]) }
});

export default function SizeTable() {
    const { t } = useTranslation("size-table");

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(content_block, styles.page)}>
            <h2 className={styles.page_title}>{ t("title") }</h2>
            <div className={styles.table_wrapper}>
                <StylableSizeTable styles={styles} t={t} />
            </div>
        </div>
    </>);
}