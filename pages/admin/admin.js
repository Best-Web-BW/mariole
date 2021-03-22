import blocks from "../../scss/blocks.module.scss";
import styles from "./admin.module.scss";
import lorem from "../../utils/lorem";
import Select from "react-select";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import cn from "classnames";

export default function Admin() {

    return (<>
        <Head>
            <title>Mariole</title>
            <meta name="description" content={lorem(100)} />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
            <meta name="keywords" content="mariole, mariole, mariole" />
        </Head>
        <div className={blocks.content_body}>
            <div className={styles.page}>
                <form action="" className={styles.enter_form}>
                    <label htmlFor="">
                        логин
                        <input type="text"/>
                    </label>
                    <label htmlFor="">
                        пароль
                        <input type="text"/>
                    </label>
                    <button>Войти</button>
                </form>
            </div>
        </div>
    </>);
}