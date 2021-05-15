import modals from "./Modals.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";

import modalsEn from "../../public/locales/en/common_modals.json";
import modalsRu from "../../public/locales/ru/common_modals.json";
const locales = { en: modalsEn, ru: modalsRu };

export function Cookie({ opened, close }) {
    const { locale } = useRouter();
    const t = locales[locale].cookie;

    return (
        <div className={cn(modals.wrapper, modals.cookies, { [modals.closed]: !opened })}>
            <div className={modals.content}>
                <span className={modals.close} onClick={close} />
                <p>{ t.title }</p>
                <p>{ t.about }</p>
                <p>
                    { t.rules }{" "}
                    <Link href="/privacy-policy">
                        <a>
                            <b>{ t["privacy-policy"] }</b>
                        </a>
                    </Link>
                    . { t.more }
                </p>
                <button className={modals.ok_button} onClick={close}>{ t.ok }</button>
            </div>
        </div>
    );
}

export function Warning() {
    return (
        <div className={cn(modals.wrapper, modals.warning)}>
            <div className={modals.content}>
                <span className={modals.close}/>
                <p>Что-то пошло не так, попробуйте еще раз.</p>
                <p>Неверный логин или пароль</p>
                <p>Заполните поле {поле}</p>
                <p>Произошла ошибка оплаты, попробуйте еще раз.</p>
                <button className={modals.ok_button}>Ок</button>
            </div>
        </div>
    )
}

export function Success() {
    return (
        <div className={cn(modals.wrapper, modals.success)}>
            <div className={modals.content}>
                <span className={modals.close}/>
                <p>Товар успешно добавлен/изменен</p>
                <p>Заявка успешно оформлена! 
                    <br/>
                    Мы свяжемся с Вами в ближайшее время.
                </p>
                <p>Заказ успешно оформлен!</p>
                <button className={modals.ok_button}>Ок</button>
            </div>
        </div>
    )
}

export function Sure() {
    return (
        <div className={cn(modals.wrapper, modals.sure)}>
            <div className={modals.content}>
                <p>Вы уверены, что хотите изменить/удалить товар?</p>
                <div className={modals.button_wrapper}>
                    <button className={modals.yes_button}>Да</button>
                    <button className={modals.no_button}>Нет</button>
                </div>
            </div>
        </div>
    )
}