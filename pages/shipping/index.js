import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import blocks from "../../scss/blocks.module.scss";
import { useTranslation } from "next-i18next";
import styles from "./index.module.scss";
import cn from "classnames";
import Head from "next/head";

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
            <h2 className={styles.page_title}>ПОЛИТИКА ДОСТАВКИ</h2>
            <div className={styles.attention}>
                <Data>
                    Просим обратить внимание, что в связи с ситуацией в мире 
                    из-за пандемии транспортные компании работают с повышенной 
                    нагрузкой. Сроки доставки и возврата могут быть увеличены.
                </Data>
            </div>
            <Data>
                Доставка осуществляется с понедельника по пятницу, 
                с 9:00 до 18:00. Клиентам из России и Казахстана мы 
                предлагаем доставку курьерской службой CDEK. 
                У покупателей из этих стран есть возможность получить 
                заказ в офисе CDEK или перенести дату доставки.
            </Data>
            <Data>
                В других странах заказ может быть доставлен другими 
                курьерскими службами, включая UPS, FedEx, TNT и KCE.
            </Data>
            <Data>
                Доставка формируется и передаётся курьерской службе 
                в течение 2 рабочих дней с момента оформления заказа.
            </Data>
            <Data>При возврате заказа, стоимость доставки не возвращается.</Data>
            <Data>
                Сроки доставки устанавливаются курьерской службой 
                и зависят от страны и региона доставки.
            </Data>
            <Data>
                Таможенные сборы не включены в стоимость товара 
                при доставке в другие страны и регионы.
            </Data>
            <Data>Услуга «примерка» не предоставляется при доставке.</Data>
            <Data>
                Обратите внимание, что налоги и таможенные сборы не 
                включены в стоимость товара. Величина сборов зависит 
                от таможенных регламентов страны доставки. Ответственность 
                за оплату налогов и сборов лежит на покупателе.
            </Data>
            <Data>
                Если у вас остались вопросы, пожалуйста, свяжитесь 
                с нами в Whatsapp по номеру телефона:&nbsp;
                <a href="tel:+7(968)001-88-80" className={styles.link}>+7 (968) 001-88-80</a>,&nbsp;
                <a href="tel:+7 (929) 500-51-46" className={styles.link}>+7 (929) 500-51-46</a>
                &nbsp;или e-mail:&nbsp;
                <a href="mailto:mariolewool@yandex.ru" className={styles.link}>Mariolewool@yandex.ru</a>
                , и мы с радостью вам поможем.
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