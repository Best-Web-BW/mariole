import serializeForm from "../utils/common/serializeForm";
import styles from "./FeedbackForm.module.scss";

export default function FeedbackForm() {
	return (
		<div className={styles.form}>
            <form onSubmit={e => {
                e.preventDefault();
                console.log(serializeForm(e.target));
            }}>
                <div className={styles.form_row}>
                    <label className={styles.name}>
                        ИМЯ
                        <input
                            className={styles.input} type="text"
                            name="name" autoComplete="given-name" required
                        />
                    </label>
                    <label className={styles.email}>
                        EMAIL
                        <input
                            className={styles.input} type="email"
                            name="email" autoComplete="email" required
                        />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label className={styles.phone}>
                        ТЕЛЕФОН
                        <input
                            className={styles.input} type="tel"
                            name="phone" autoComplete="tel" required
                        />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label className={styles.comment}>
                        СООБЩЕНИЕ
                        <textarea
                            className={styles.input} type="text"
                            name="message" autoComplete="off" required
                        />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <button className={styles.submit}>Отправить</button>
                </div>
            </form>
        </div>
    );
}