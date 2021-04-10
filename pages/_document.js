import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="stylesheet" href="/fonts/Fontello/css/fontello.css" />
                    <link rel="stylesheet" href="/fonts/Fontello/css/animation.css" />
                    <link rel="stylesheet" href="/fonts/Fontello/css/fontello-codes.css" />
                    <link rel="stylesheet" href="/fonts/Fontello/css/fontello-embedded.css" />

                    <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-touch-icon-120x120.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-touch-icon-152x152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon-180x180.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-touch-icon-76x76.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-touch-icon-60x60.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
                    <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#000000" />
                    <meta name="msapplication-TileImage" content="/icons/mstile-144x144.png" />
                    <link rel="shortcut icon" href="/icons/favicon.ico" />

                    <link rel="manifest" href="/icons/manifest.json" />
                    <meta name="msapplication-config" content="/icons/browserconfig.xml" />
                    
                    <meta name="apple-mobile-web-app-title" content="Mario'le Shop" />
                    <meta name="application-name" content="Mario'le Shop" />
                    <meta name="msapplication-TileColor" content="#ffffff" />
                    <meta name="theme-color" content="#ffffff" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}