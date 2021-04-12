import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Link from "next/link";
import Head from "next/head";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["page_media"]) }
});

export default function Media() {
    const { t } = useTranslation("page_media");

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(blocks.content_block, styles.page)}>
            <h2 className={styles.page_title}>О НАС ПИШУТ</h2>
            <div className={styles.row}>
                <ContentBlock image="/images/press/page_1" link="#" />
                <ContentBlock image="/images/press/_file5afd3e200b21b" link="#" />
            </div>
        </div>
    </>);
}

function ContentBlock({ image, link }) {
    return (
        <div className={styles.elem}>
            <div className={styles.elem_row_1}>
                <img src={image} alt="" />
            </div>
            <div className={styles.elem_row_2}>
                <Link href={link}>
                    <a className={styles.read}>Читать в источнике</a>
                </Link>
            </div>
        </div>
    );
}