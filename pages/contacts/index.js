import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FeedbackForm from "../../components/FeedbackForm";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import Head from "next/head";
import cn from "classnames";

export const getStaticProps = async ({ locale }) => ({
    props: { ...await serverSideTranslations(locale, ["page_contacts", "component_feedback-form"]) }
});

export default function Contacts() {
    const { t } = useTranslation("page_contacts");
    const { t: feedbackForm } = useTranslation("component_feedback-form");

    return (<>
        <Head>
            <title>{ t("title") }</title>
        </Head>
        <div className={cn(blocks.content_block, styles.page)}>
            <div className={styles.row}>
                <p className={styles.title}>Наша продукция представлена в:</p>
                <img className={styles.desktop} src="/images/blocks/150.webp" alt="" />
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>Центр красоты и здоровья "Белый Сад"</p>
                    <p className={styles.data}>Москва, Зубовский проезд, дом 1</p>
                    <a href="tel:+74995000051" className={styles.data}>+7 (499) 500 00 51</a>
                </div>
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>Центр красоты и здоровья "Белый Сад"</p>
                    <p className={styles.data}>Театральный пр-д, 2, Москва</p>
                    <a href="tel:+74997959595" className={styles.data}>+7 (499) 795-95-95</a>
                </div>
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>Центр красоты "Aldo Coppola"</p>
                    <p className={styles.data}>Московская область, Рублево-Успенское шоссе, Жуковка, д. 204</p>
                    <a href="tel:+74956353110" className={styles.data}>+7 (495) 635-31-10</a>
                </div>
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>Салон красоты CELEBRITY</p>
                    <p className={styles.data}>Москва, Лубянка, Малый Черкасский переулок дом 2, этаж 2</p>
                    <a href="tel:+74957218835" className={styles.data}>+7 (495) 721 88 35</a>
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.title}>Наши контакты:</p>
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>109316, Москва, а/я 111</p>
                    <p className={styles.data}>
                        Телефон: <a href="tel:+79295005146" className={styles.data}>+7 (929) 500-51-46</a>
                        , &nbsp;<a href="tel:+79680018880" className={styles.data}>+7 (968) 001-88-80</a>
                    </p>
                    <p className={styles.data}>
                        Почта: <a href="mailto:mariolewool@yandex.ru" className={styles.data}>Mariolewool@yandex.ru</a>
                    </p>
                    <a href="https://www.instagram.com/mario__le/?hl=ru" className={styles.data}>Instagram: Mario__le</a>
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.title}>Связаться с нами:</p>
                <div className={styles.contact_form_wrapper}>
                    <FeedbackForm t={feedbackForm} />
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.title}>Наши реквизиты:</p>
            </div>
        </div>
    </>);
}