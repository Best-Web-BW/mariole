import styles from "./return-and-exchange.module.scss";
import blocks from "../scss/blocks.module.scss";
import { useState } from "react";
import cn from "classnames";

export default function ReturnAndExchange() {
    return (
        <div className={cn(blocks.content_block, styles.page)}>
            <h2 className={styles.page_title}>Условия возврата и обмена</h2>
            <ExpansibleBlock title="Как вернуть не подошедший товар?">
                <p className={styles.title}>Возврат курьерской службой:</p>
                <p>Вы можете вернуть купленный товар при следующих условиях:</p>
                <ul>
                    <li>
                        - сохранён товарный вид изделия (сохранение товарного вида, 
                        отсутствие следов эксплуатации, наличие всех 
                        заводских бирок и оригинальной упаковки),
                    </li>
                    <li>- срок обращения не превышает 14 календарных дней (со дня получения посылки),</li>
                    <li>- приложен корректно заполненный бланк возврата (образец заполнения).</li>
                </ul>
                <p>
                    Если вы не обнаружили бланк возврата в посылке, 
                    вы можете распечатать его самостоятельно:
                </p>
                <p>БЛАНК ВОЗВРАТА</p>
                <p>
                    Возврат приобретённого в интернет-магазине товара 
                    осуществляется силами и за счёт покупателя любой 
                    курьерской службой (способом доставки до двери).
                </p>
                <p>Адрес доставки:</p>
                <p>
                    Получатель: Mario'le <a href="tel:+7 (968) 001-88-80">+7 (968) 001-88-80</a>
                </p>
                <p>
                    Обращаем ваше внимание, что возврат товара осуществляется 
                    силами и за счёт Покупателя. Наш менеджер свяжется с вами, 
                    как только товар будет получен. Возврат денежных средств 
                    осуществляется тем же способом, которым была произведена оплата.
                </p>
                <p>
                    *Консультация менеджера по подбору размера одежды или 
                    аксессуаров, равно как и информация на сайте о замерах 
                    товаров, носит информационно-рекомендательный характер, 
                    и не является гарантией точного подбора размера. 
                    Не подошедший размер не является оcнованием для претензии.
                </p>
            </ExpansibleBlock>
            <ExpansibleBlock title="Как вернуть не подошедший товар?">
                <p className={styles.title}>Вы получили мой возврат?</p>
                <p>Для ускорения процесса возврата рекомендуется:</p>
                <p>
                    Сообщить менеджеру о намерении вернуть товар - 
                    так мы будем иметь возможность помочь вам оперативно 
                    оформить необходимые документы в надлежащем виде. 
                    Сообщить менеджеру о факте отправки товара, 
                    предоставив подтверждающие документы.
                </p>
                <p>Связаться с менеджером возможно следующими способами:</p>
                <p>
                    WhatsApp <a href="tel:+7 (968) 001-88-80">+7 (968) 001-88-80</a>
                </p>
                <p>
                    Почта: <a href="mailto:Mariolewool@yandex.ru">Mariolewool@yandex.ru</a>
                </p>
                <p>
                    Обработка возврата занимает до 3 рабочих дней с момента 
                    получения товара. Как только возврат будет получен и 
                    оформлен мы незамедлительно свяжемся с 
                    вами по телефону или электронной почте.
                </p>
            </ExpansibleBlock>
            <ExpansibleBlock title="Как и когда произойдет возврат средств?">
                <p>Возврат денежных средств осуществляется тем же способом, которым была произведена оплата.</p>
                <p>Срок возврата денежных средств составляет 1-5 рабочих дней с момента оформления возврата*</p>
                <p>**срок возврата зависит от банка-эмитента, выпустившего вашу карту.</p>
            </ExpansibleBlock>
            <ExpansibleBlock title="За чей счёт осуществляется обратная отправка товара?">
                <p>Мы осуществляем возврат стоимости товара без стоимости обратной отправки.</p>
                <p>Исключениями являются: товары с дефектом, ошибочно отправленные товары.</p>
                <p>
                    *Консультация менеджера по подбору размера одежды или 
                    аксессуаров, равно как и информация на сайте о замерах 
                    товаров, носит информационно-рекомендательный характер, 
                    и не является гарантией точного подбора размера. 
                    Не подошедший размер не является оcнованием для претензии.
                </p>
            </ExpansibleBlock>
            <ExpansibleBlock title="Чем регулируется возврат товара?">
                <p>Все случаи возврата товара регулируются законами:</p>
                <ul>
                    <li>
                        - Постановлением Правительства от 19 января 1998 года №55, 
                        "Об утверждении Правил продаж отдельных видов товаров, 
                        перечня товаров длительного пользования, на которые 
                        не распространяется требование покупателя о безвозмездном 
                        предоставлении ему на период ремонта или замены аналогичного 
                        товара перечня непродовольственных товаров надлежащего качества, 
                        не подлежащих возврату или обмену на аналогичный товар других 
                        размера, формы, габарита, фасона, расцветки или комплектации";
                    </li>
                    <li>- Правила продажи товаров дистанционным способом;</li>
                    <li>- Федеральным Законом от 07 февраля 1992 года №2300-1 "О защите прав потребителей".</li>
                </ul>
            </ExpansibleBlock>
        </div>
    );
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