import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
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
            <h2 className={styles.page_title}>{ t("media-caps") }</h2>
            <div className={styles.row}>
                <ContentBlock
                    t={t} image="/images/press/page_1"
                    link="https://www.elledecoration.ru/heroes/design/novye-imena-luchshie-tekstilnye-mastera-rossii-i-belarusi-id6858881/"
                />
                <ContentBlock image="/images/press/_file5afd3e200b21b" t={t} />
            </div>
        </div>
    </>);
}

function ContentBlock({ image, link, t }) {
    return (
        <div className={styles.elem}>
            <div className={styles.elem_row_1}>
                <img src={image} alt="" />
            </div>
            { link && (
                <div className={styles.elem_row_2}>
                    <a className={styles.read} href={link} target="_blank">{ t("source") }</a>
                </div>
            )}
        </div>
    );
}