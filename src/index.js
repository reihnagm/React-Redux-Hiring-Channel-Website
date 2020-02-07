import React from 'react';
import { render } from 'react-dom';
import App from './components/App/Index';
import purple from '@material-ui/core/colors/purple';
import {
    ThemeProvider,
    createMuiTheme,
    CssBaseline
} from '@material-ui/core'
const Main = () => {
    const theme = createMuiTheme({
        overrides: {
            MuiContainer : {
                root: {
                    marginTop: "30px",
                    marginBottom: "30px"
                }
            },
            MuiButton: {
                root: {
                    margin: "10px"
                }
            }
        },
        palette: {
            primary: {
                main: purple['A100'],
                contrastText: purple['50']
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    )
}
render(<Main />, document.getElementById('root'));
