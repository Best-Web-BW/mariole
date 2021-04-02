import serializeForm from "../../utils/common/serializeForm";
import blocks from "../../scss/blocks.module.scss";
import { inject, observer } from "mobx-react";
import styles from "./login.module.scss";
import Router from "next/router";
import runAutoRefresh from "../../utils/auth/runAutoRefresh";

export default inject("store")(observer(function Login({ store }) {
    const submit = async data => {
        const response = await fetch("/api/auth/authenticate", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify(data)
        });
        if(response.status === 200) {
            runAutoRefresh(store);
            Router.push("/admin/edit");
        }
    };

    return (<>
        <div className={blocks.content_body}>
            <div className={styles.page}>
                <form className={styles.enter_form} onSubmit={evt => {
                    evt.preventDefault();
                    submit(serializeForm(evt.target));
                }}>
                    <label>
                        логин
                        <input
                            type="text" name="login"
                            autoComplete="on" required
                        />
                    </label>
                    <label>
                        пароль
                        <input
                            type="password" name="password"
                            autoComplete="current-password" required
                        />
                    </label>
                    <button>Войти</button>
                </form>
            </div>
        </div>
    </>);
}));