import blocks from "../scss/blocks.module.scss";
import styles from "./shipping.module.scss";
import lorem from "../utils/lorem";
import Select from "react-select";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";

export default function Shipping() {

    return (<>
        <div className={blocks.content_body}>
            <div className={cn(blocks.content_block, styles.page)}>
                <h2 className={styles.page_title}>ПОЛИТИКА ДОСТАВКИ</h2>
                <div className={cn(styles.data, styles.attention)}>
                    <p>Просим обратить внимание, что в связи с ситуацией в мире из-за пандемии транспортные компании работают с повышенной нагрузкой. Сроки доставки и возврата могут быть увеличены.</p>
                </div>
                <div className={cn(styles.data)}>
                    <p>Доставка осуществляется с понедельника по пятницу, с 9:00 до 18:00. Клиентам из России и Казахстана мы предлагаем доставку курьерской службой CDEK. У покупателей из этих стран есть возможность получить заказ в офисе CDEK или перенести дату доставки.</p>
                </div>
                <div className={cn(styles.data)}>
                    <p>В других странах заказ может быть доставлен другими курьерскими службами, включая UPS, FedEx, TNT и KCE</p>
                </div>
                <div className={cn(styles.data)}>
                    <p>Доставка формируется и передается курьерской службе в течение 2 рабочих дней с момента оформления заказа</p>
                </div>
                <div className={cn(styles.data)}>
                    <p>При возврате заказа, стоимость доставки не возвращается</p>
                </div>
                <div className={cn(styles.data)}>
                    <p>Сроки доставки устанавливаются курьерской службой и зависят от страны и региона доставки</p>
                </div>
                <div className={cn(styles.data)}>
                    <p>Таможенные сборы не включены в стоимость товара при доставке в другие страны и регионы.</p>
                </div>
                <div className={cn(styles.data)}>
                    <p>Услуга «примерка» не предоставляется при доставке.</p>
                </div>
                <div className={cn(styles.data)}>
                    <p>Обратите внимание, что налоги и таможенные сборы не включены в стоимость товара. Величина сборов зависит от таможенных регламентов страны доставки. Ответственность за оплату налогов и сборов лежит на покупателе.</p>
                </div>
                <div className={cn(styles.data)}>
                    <p>Если у вас остались вопросы, пожалуйста, свяжитесь с нами в Whatsapp по номеру телефона:&nbsp;
                    <a href="tel:+7(968)001-88-80" className={styles.link}>+7 (968) 001-88-80</a>&nbsp;
                     или e-mail:&nbsp; <a href="mailto:Mariolewool@yandex.ru" className={styles.link}>Mariolewool@yandex.ru</a>, и мы с радостью вам поможем.</p>
                </div>
            </div>
        </div>
    </>)
}