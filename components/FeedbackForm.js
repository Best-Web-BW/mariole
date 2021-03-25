import collectFormData from "../utils/common/collectFormData";
import styles from "./FeedbackForm.module.scss";

export default function FeedbackForm() {
	return (
		<div className={styles.form}>
            <form onSubmit={e => {
                e.preventDefault();
                console.log(collectFormData(e.target));
            }}>
                <div className={styles.form_row}>
                    <label className={styles.name}>
                        ИМЯ
                        <input className={styles.input} type="text" name="name" autoComplete="name" />
                    </label>
                    <label className={styles.email}>
                        EMAIL
                        <input className={styles.input} type="text" name="email" autoComplete="email" />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label className={styles.phone}>
                        ТЕЛЕФОН
                        <input className={styles.input} type="text" name="phone" autoComplete="tel" />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label className={styles.comment}>
                        СООБЩЕНИЕ
                        <textarea className={styles.input} type="text" name="message" autoComplete="off" />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <button className={styles.submit}>Отправить</button>
                </div>
            </form>
        </div>
    );
}