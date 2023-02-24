import { extendTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';

const theme = extendTheme({
  ...chakraTheme,
  icons: {
    ...chakraTheme.icons,
  },
});

export default theme;
