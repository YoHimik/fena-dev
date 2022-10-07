import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
import React, { FC, PropsWithChildren} from 'react'
import {red} from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import {GlobalStyles} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e96fa',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#edf1f3'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 730,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    }
});

export const Theme = responsiveFontSizes(theme)

const GlobalStylesStyles = {
    '#__next': {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    }
}

export const ThemeContextProvider: FC<PropsWithChildren> = (props) => {
    const {
        children
    } = props

    return (
        <ThemeProvider theme={Theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline/>
            {/* @ts-ignore */}
            <GlobalStyles styles={GlobalStylesStyles}/>
            {children}
        </ThemeProvider>
    )
}
