import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="ru">
                <Head>
                    <link rel="stylesheet" href="/fonts/Fontello/css/fontello.css" />
                    <link rel="stylesheet" href="/fonts/Fontello/css/animation.css" />
                    <link rel="stylesheet" href="/fonts/Fontello/css/fontello-codes.css" />
                    <link rel="stylesheet" href="/fonts/Fontello/css/fontello-embedded.css" />

                    <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />

                    <link rel="shortcut icon" type="image/x-icon" href="/icons/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/icons/favicon-96x96.png" />

                    <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png" />
                    <link rel="icon" type="image/png" sizes="192x192" href="/icons/android-icon-192x192.png" />

                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#ffffff" />

                    <meta name="msapplication-starturl" content="/" />
                    <meta name="msapplication-config" content="/browserconfig.xml" />

                    <meta name="application-name" content="Plug" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-title" content="MD" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}