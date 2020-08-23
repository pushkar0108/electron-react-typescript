import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core';

import Application from './components/Application';
import store from './store';

const customTheme = {
    ...theme,
    colors: {
        ...theme.colors,
        green: {
            50: '#F0FFF4',
            100: '#C6F6D5',
            200: '#9AE6B4',
            300: '#68D391',
            400: '#48BB78',
            500: '#38A169',
            600: '#2F855A',
            700: '#276749',
            800: '#22543D',
            900: '#1C4532'
        }
    }
};

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

// Render components
const render = (Component: () => JSX.Element) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ThemeProvider theme={customTheme}>
                    {/* <CSSReset /> */}
                    <Component />
                </ThemeProvider>
            </Provider>
        </AppContainer>,
        mainElement
    );
};

render(Application);
