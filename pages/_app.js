import Layout from "../components/Layout";
import Head from "next/head";
import "../scss/main.scss";

export default function MyApp({ Component, pageProps }) {
	return (
		<Layout>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            </Head>
			<Component { ...pageProps } />
		</Layout>
	);
}