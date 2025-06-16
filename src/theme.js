import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    colorSchemes: { dark: true },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    components: {
        MuiAlert: {
            styleOverrides: {
                root: {
                    variants: [{
                        props: { severity: 'info' },
                        style: {
                            backgroundColor: '#60a5fa',
                        },
                    }],
                },
            },
        },
    },
});

export default theme;