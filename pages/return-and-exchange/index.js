import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import { useState } from "react";
import Head from "next/head";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["page_return-and-exchange"]) }
});

export default function ReturnAndExchange() {
    const { t } = useTranslation("page_return-and-exchange");

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(blocks.content_block, styles.page)}>
            <h2 className={styles.page_title}>{ t("terms") }</h2>
            <ExpansibleBlock title={t("block1.title")}>
                <p className={styles.title}>{ t("block1.p1") }</p>
                <p>{ t("block1.p2") }</p>
                <ul>
                    <li>{ t("block1.ul1-li1") }</li>
                    <li>{ t("block1.ul1-li2") }</li>
                    <li>{ t("block1.ul1-li3") }</li>
                </ul>
                <p>{ t("block1.p3") }</p>
                <p>{ t("block1.p4-return-letter") }</p>
                <p>{ t("block1.p5") }</p>
                <p>{ t("block1.p6-shipping-address") }</p>
                <p>
                    { t("block1.p7-receiver") }
                    &nbsp;<a href="tel:+79680018880">+7 (968) 001-88-80</a>,
                    &nbsp;<a href="tel:+79295005146">+7 (929) 500-51-46</a>
                </p>
                <p>{ t("block1.p8") }</p>
                <p>{ t("block1.p9") }</p>
            </ExpansibleBlock>
            <ExpansibleBlock title={t("block2.title")}>
                <p className={styles.title}>{ t("block2.p1") }</p>
                <p>{ t("block2.p2") }</p>
                <p>{ t("block2.p3") }</p>
                <p>{ t("block2.p4") }</p>
                <p>
                    { t("block2.p5-whatsapp") }
                    &nbsp;<a href="tel:+79680018880">+7 (968) 001-88-80</a>,
                    &nbsp;<a href="tel:+79295005146">+7 (929) 500-51-46</a>
                </p>
                <p>
                    { t("block2.p6-email") } <a href="mailto:mariolewool@yandex.ru">Mariolewool@yandex.ru</a>
                </p>
                <p>{ t("block2.p7") }</p>
            </ExpansibleBlock>
            <ExpansibleBlock title={t("block3.title")}>
                <p>{ t("block3.p1") }</p>
                <p>{ t("block3.p2") }</p>
                <p>{ t("block3.p3") }</p>
            </ExpansibleBlock>
            <ExpansibleBlock title={t("block4.title")}>
                <p>{ t("block4.p1") }</p>
                <p>{ t("block4.p2") }</p>
                <p>{ t("block4.p3") }</p>
            </ExpansibleBlock>
            <ExpansibleBlock title={t("block5.title")}>
                <p>{ t("block5.p1") }</p>
                <ul>
                    <li>{ t("block5.ul1-li1") }</li>
                    <li>{ t("block5.ul1-li2") }</li>
                    <li>{ t("block5.ul1-li3") }</li>
                </ul>
            </ExpansibleBlock>
        </div>
    </>);
}

function ExpansibleBlock({ title, children }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={cn(styles.data, { [styles.active]: expanded })}>
            <p className={styles.show_more_btn} onClick={() => setExpanded(prev => !prev)}>
                <span className={styles.show_more_icn} />
                { title }
            </p>
            <div className={styles.info_container}>{ children }</div>
        </div>
    );
}