/* -------------------------------------------------------------------------- */
/*                                   Header                                   */
/* -------------------------------------------------------------------------- */
// Libraries
import React from 'react';
import {Provider} from 'react-redux';
import type {NextComponentType} from 'next';

// Store redux
import {store} from 'store';

// Type next
type MyAppProps = {
    Component: NextComponentType,
    pageProps: any
}

// Global styles
import '../styles/globals.scss';
import 'antd/dist/antd.css';
import 'intro.js/introjs.css';

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */
function MyApp({Component, pageProps}: MyAppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
