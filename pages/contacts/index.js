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
                <p className={styles.title}>{ t("our-production-presented") }</p>
                <img className={styles.desktop} src="/images/blocks/150" alt="" />
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>{ t("belyj-sad.title") }</p>
                    <p className={styles.data}>{ t("belyj-sad.address-1") }</p>
                    <a className={styles.data} href="tel:+74995000051">+7 (499) 500 00 51</a>
                </div>
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>{ t("belyj-sad.title") }</p>
                    <p className={styles.data}>{ t("belyj-sad.address-2") }</p>
                    <a className={styles.data} href="tel:+74997959595">+7 (499) 795-95-95</a>
                </div>
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>{ t("aldo-coppola.title") }</p>
                    <p className={styles.data}>{ t("aldo-coppola.address") }</p>
                    <a className={styles.data} href="tel:+74956353110">+7 (495) 635-31-10</a>
                </div>
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>{ t("celebrity.title") }</p>
                    <p className={styles.data}>{ t("celebrity.address") }</p>
                    <a className={styles.data} href="tel:+74957218835">+7 (495) 721 88 35</a>
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.title}>{ t("our-contacts") }</p>
                <div className={styles.data_wrapper}>
                    <p className={styles.data}>{ t("address") }</p>
                    <p className={styles.data}>
                        { t("phones") }
                        &nbsp;<a href="tel:+79295005146" className={styles.data}>+7 (929) 500-51-46</a>,
                        &nbsp;<a href="tel:+79680018880" className={styles.data}>+7 (968) 001-88-80</a>
                    </p>
                    <p className={styles.data}>
                        { t("email") } <a href="mailto:mariolewool@yandex.ru" className={styles.data}>Mariolewool@yandex.ru</a>
                    </p>
                    <a href="https://instagram.com/mario__le" className={styles.data}>Instagram: Mario__le</a>
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.title}>{ t("contact-us") }</p>
                <div className={styles.contact_form_wrapper}>
                    <FeedbackForm t={feedbackForm} />
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.title}>{ t("our-details") }</p>
                <div className={styles.bank_details_wrapper}>
                    <p className={styles.bank_details_title}>{ t("data.legal-address.title") }</p>
                    <p className={styles.bank_details_data}>{ t("data.legal-address.content") }</p>
                    <p className={styles.bank_details_title}>{ t("data.tin") }</p>
                    <p className={styles.bank_details_data}>7721 38315755</p>
                    <p className={styles.bank_details_title}>{ t("data.psrn") }</p>
                    <p className={styles.bank_details_data}>316774600504150</p>
                    <p className={styles.bank_details_title}>{ t("data.checking-account") }</p>
                    <p className={styles.bank_details_data}>40802 810 9000 0004 5919</p>
                    <p className={styles.bank_details_title}>{ t("data.bank.name.title") }</p>
                    <p className={styles.bank_details_data}>{ t("data.bank.name.content") }</p>
                    <p className={styles.bank_details_title}>{ t("data.bank.legal-address.title") }</p>
                    <p className={styles.bank_details_data}>{ t("data.bank.legal-address.content") }</p>
                    <p className={styles.bank_details_title}>{ t("data.bank.correspondent-account") }</p>
                    <p className={styles.bank_details_data}>30101 810 1452 5000 0974</p>
                    <p className={styles.bank_details_title}>{ t("data.bank.tin") }</p>
                    <p className={styles.bank_details_data}>7710 140679</p>
                    <p className={styles.bank_details_title}>{ t("data.bank.bic") }</p>
                    <p className={styles.bank_details_data}>044525974</p>
                </div>
            </div>
        </div>
    </>);
}