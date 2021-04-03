import serializeForm from "../utils/common/serializeForm";
import styles from "./FeedbackForm.module.scss";

export default function FeedbackForm({ t }) {
	return (
		<div className={styles.form}>
            <form onSubmit={e => {
                e.preventDefault();
                console.log(serializeForm(e.target));
            }}>
                <div className={styles.form_row}>
                    <label className={styles.name}>
                        { t("name") }
                        <input
                            className={styles.input} type="text"
                            name="name" autoComplete="given-name" required
                        />
                    </label>
                    <label className={styles.email}>
                        { t("email") }
                        <input
                            className={styles.input} type="email"
                            name="email" autoComplete="email" required
                        />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label className={styles.phone}>
                        { t("phone") }
                        <input
                            className={styles.input} type="tel"
                            name="phone" autoComplete="tel" required
                        />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label className={styles.comment}>
                        { t("message") }
                        <textarea
                            className={styles.input} type="text"
                            name="message" autoComplete="off" required
                        />
                    </label>
                </div>
                <div className={styles.form_row}>
                    <button className={styles.submit}>{ t("send") }</button>
                </div>
            </form>
        </div>
    );
}