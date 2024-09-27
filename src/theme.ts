import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: () => ({
      '@font-face': {
        fontFamily: 'MADE Outer Sans Alt',
        src: `url('/fonts/MADE-Outer-Sans-Bold-PERSONAL-USE.woff') format('woff')`,
        fontWeight: 'bold',
        fontStyle: 'normal',
      },
    }),
  },
  textStyles: {
    customText: {
      // Nombre del estilo de texto
      color: '#FA3232',
      fontWeight: 'bold',
      textShadow: '5px 5px 0px #2AC5D3',
      fontFamily: "'MADE Outer Sans Alt', sans-serif",
    },
  },
});

export default theme;
