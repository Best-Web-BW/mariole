import admin from "../../../scss/adminButtons.module.scss";
import { inject, observer } from "mobx-react";

export default inject("store")(observer(function Logout({ store }) {
    return (
        <button
            className={admin.exit}
            onClick={async () => {
                await fetch("/api/auth/logout");
                store.disableAdmin();
            }}
        >Выход</button>
    );
}))