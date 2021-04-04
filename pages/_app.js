import { content_body } from "../scss/blocks.module.scss";
import runAutoRefresh from "../utils/auth/runAutoRefresh";
import { appWithTranslation } from "next-i18next";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Provider } from "mobx-react";
import { useStore } from "../store";
import { useEffect } from "react";
import Head from "next/head";
import "../scss/main.scss";

import commonEn from "../public/locales/en/common.json";
import commonRu from "../public/locales/ru/common.json";
const common = {
    ru: commonRu,
    en: commonEn
}

export default appWithTranslation(function MyApp({ Component, pageProps, router: { locale } }) {
    const store = useStore(pageProps.initialState);
    useEffect(() => store.initClientStore(), []);
    useEffect(() => runAutoRefresh(store), []);

	return (<>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="robots" content="index, follow" />
        </Head>
        <Provider store={store}>
            <header>
                <Header t={common[locale].header} />
            </header>
            <main>
                <div className={content_body}>
                    <Component { ...pageProps } />
                </div>
            </main>
            <footer>
                <Footer t={common[locale].footer} />
            </footer>
        </Provider>
	</>);
});