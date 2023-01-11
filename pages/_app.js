import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/router';


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const {
        Component,
        emotionCache = clientSideEmotionCache,
        pageProps,
    } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <SessionProvider session={pageProps.session}>
                    {Component.auth ? (
                        <Auth isAdmin={Component.auth.isAdmin}>
                            <Component {...pageProps} />
                        </Auth>
                    ) : (
                        <Component {...pageProps} />
                    )}
                </SessionProvider>
            </ThemeProvider>
        </CacheProvider>
    );
}

function Auth({ children, isAdmin }) {
    //console.log(isAdmin);
    const router = useRouter();

    const { status, data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/");
        },
    });

    if (status === "loading") {
        return <div>Loading...</div>;
    }
    if (isAdmin && !session.user.isAdmin) {
        router.push(`${window.location.origin}`);
    }

    return children;
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};
