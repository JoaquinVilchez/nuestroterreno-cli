import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        fontFamily: "'MADE Outer Sans Alt', sans-serif",
      },
      '@font-face': {
        fontFamily: 'MADE Outer Sans Alt',
        src: `url('/fonts/MADE-Outer-Sans-Bold-PERSONAL-USE.woff') format('woff')`,
        fontWeight: 'bold',
        fontStyle: 'normal',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: 'MADE Outer Sans Alt',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        background: '#fff',
        border: '2px solid black',
        boxShadow: '4px 4px 0px #FA3232',
        borderRadius: '15px',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        _hover: {
          background: '#fff',
          boxShadow: '4px 4px 0px #2AC5D3',
        },
      },
      variants: {
        red: {
          background: '#FA3232',
          color: '#fff',
          padding: '0px 40px',
          _hover: {
            background: '#FA3232',
            boxShadow: '4px 4px 0px #2AC5D3',
          },
        },
        ghost: {
          background: 'transparent',
          color: '#000',
        },
      },
      defaultProps: {
        variant: '',
      },
    },
    Input: {
      baseStyle: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        background: '#000',
        border: '2px solid black',
        boxShadow: '4px 4px 0px #FA3232',
        borderRadius: '15px',
      },
    },
  },
  textStyles: {
    bodyText: {
      fontWeight: 'regular',
    },
    designFont: {
      color: '#fff',
      fontWeight: 'bold',
      textShadow: '4px 4px 0px #FA3232',
      fontFamily: "'MADE Outer Sans Alt', sans-serif",
    },
    bigTitle: {
      color: '#FA3232',
      fontWeight: 'bold',
      textShadow: '4px 4px 0px #000',
      fontFamily: "'MADE Outer Sans Alt', sans-serif",
    },
  },
});

export default theme;
