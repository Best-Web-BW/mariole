import styles from "./FeedbackForm.module.scss";

export default function FeedbackForm() {
	return (
		<div className={styles.form}>
            <form onSubmit={e => {
                e.preventDefault();
                console.log("Submitted!");
            }}>
                <div className={styles.form_row}>
                    <label className={styles.name}>
                        ИМЯ
                        <input type="text" className={styles.input} />
                    </label>
                    <label className={styles.email}>
                        EMAIL
                        <input type="text" className={styles.input} />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label className={styles.phone}>
                        ТЕЛЕФОН
                        <input type="text" className={styles.input} />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label className={styles.comment}>
                        СООБЩЕНИЕ
                        <textarea type="text" className={styles.input} />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <button className={styles.submit}>Отправить</button>
                </div>
            </form>
        </div>
    );
}