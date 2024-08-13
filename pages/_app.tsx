import React from 'react';
import { GlobalProvider } from '@/context/GlobalContext';

function MyApp({ Component, pageProps }: any) {
    return (
        <GlobalProvider>
            <Component {...pageProps} />
        </GlobalProvider>
    );
}

export default MyApp;