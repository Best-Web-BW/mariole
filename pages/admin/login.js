import serializeForm from "../../utils/common/serializeForm";
import blocks from "../../scss/blocks.module.scss";
import styles from "./login.module.scss";

export default function Login() {
    return (<>
        <div className={blocks.content_body}>
            <div className={styles.page}>
                <form
                    className={styles.enter_form}
                    onSubmit={evt => {
                        evt.preventDefault();
                        const data = serializeForm(evt.target);
                        console.log({ data });
                    }}
                >
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
}