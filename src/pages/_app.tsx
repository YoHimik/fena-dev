import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {CacheProvider, EmotionCache} from '@emotion/react';
import {createEmotionCache} from '../utils';
import {AppContextProvider, ThemeContextProvider} from "../contexts";
import {Layout} from "../modules";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps
    } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <AppContextProvider>
                <ThemeContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeContextProvider>
            </AppContextProvider>
        </CacheProvider>
    );
}
