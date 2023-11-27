import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

// 2. Add your color mode config

// 3. extend the theme

const theme = extendTheme({
  colors: {
    default: {
      backgroundSolid: '#2c3f52',
      foregroundText: '#fbe0c4',
      gradient: false,
      boxShadows: true,
      boxShadowSettings1: '#253544',
      boxShadowSettings2: '#31475c',
    },
  },
});

export default theme;
