import styles from "./feedbackForm.module.scss";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";

export default function FeedbackForm() {
	return (<>
		<div className={styles.form}>
            <form action="">
                <div className={styles.form_row}>
                    <label htmlFor="" className={styles.name}>
                        ИМЯ
                        <input type="text" className={cn(styles.input)}/>
                    </label>
                    <label htmlFor="" className={styles.email}>
                        EMAIL
                        <input type="text" className={cn(styles.input)}/>
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label className={styles.phone}>
                        ТЕЛЕФОН
                        <input type="text" className={cn(styles.input)}/>
                    </label>
                </div>
                <div className={styles.form_row}>
                    <label htmlFor="" className={styles.comment}>
                        СООБЩЕНИЕ
                        <textarea type="text" className={cn(styles.input)}/>
                    </label>
                </div>
                <div className={styles.form_row}>
                    <button className={styles.submit}>Отправить</button>
                </div>
            </form>
        </div>
    </>);
}