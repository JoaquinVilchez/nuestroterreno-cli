import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light', // o 'dark'
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
