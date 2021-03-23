import { content_block } from "../scss/blocks.module.scss";
import modals from "./modals.module.scss";
import cn from "classnames";

export default function CookiesModal() {
    return (
        <div className={cn(modals.wrapper, modals.cookies)}>
            <div className={modals.content}>
                <span className={modals.close}/>
                <p>Наш сайт, как и большинство других, использует cookies-файлы для быстроты и удобства работы с ним.</p>
                <p>Некоторые типы используемых cookies-файлов необходимы, чтобы вы могли осуществлять просмотр содержимого данного 
                    веб-сайта и использовать ряд его функций. Мы используем cookies-файлы функционального типа, которые сохраняют информацию о 
                    ваших действиях в процессе использования сайта, чтобы мы могли подстроить его работу под предпочтения пользователей. 
                    Такая информация обезличивается и не используется в других целях.
                </p>
                <p>Условия использования cookies-файлов — часть <Link href="/privacy-policy"><a>Политики обработки персональных данных</a></Link>. 
                    Там можно найти больше информации о том, как мы защищаем данные посетителей сайта.</p>
                    <button className={modals.ok_button}>Ок</button>
            </div>
        </div>
    )
}

export default function WarningModal() {
    return (
        <div className={cn(modals.wrapper, modals.warning)}>
            <div className={modals.content}>
                <span className={modals.close}/>
                <p>Что-то пошло не так, попробуйте еще раз.</p>
                <p>Неверный логин или пароль</p>
                <p>Заполните поле {поле}</p>
                <button className={modals.ok_button}>Ок</button>
            </div>
        </div>
    )
}

export default function SuccessModal() {
    return (
        <div className={cn(modals.wrapper, modals.success)}>
            <div className={modals.content}>
                <span className={modals.close}/>
                <p>Товар успешно добавлен/изменен</p>
                <button className={modals.ok_button}>Ок</button>
            </div>
        </div>
    )
}

export default function SureModal() {
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