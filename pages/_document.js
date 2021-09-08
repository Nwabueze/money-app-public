// Only for applying styles on page refresh
import { ServerStyleSheets } from '@material-ui/core/styles';
/* eslint-disable */
import Document, { Html, Head, Main, NextScript } from 'next/document';
/* eslint-enable */
import React from 'react';
import { GoogleFonts } from "nextjs-google-fonts/GoogleFonts";

export default class MyDocument extends Document {
    
    render(){
        return (
            <Html lang="en">
                <Head>
                {GoogleFonts()}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => {
        return originalRenderPage({
            /* eslint-disable */
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
            /* eslint-enable */
        })
    }

    const initialProps = await Document.getInitialProps(ctx);
    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
        ]
    }
}