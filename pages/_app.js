import { content_body } from "../scss/blocks.module.scss";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { Provider } from "mobx-react";
import { useStore } from "../store";
import { useEffect } from "react";
import Head from "next/head";
import "../scss/main.scss";

export default function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialState);
    useEffect(() => store.initClientStore(), []);

	return (<>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </Head>
        <Provider store={store}>
            <header>
                <Header />
            </header>
            <main>
                <div className={content_body}>
                    <Component { ...pageProps } />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </Provider>
	</>);
}