import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {
  Box,
  ChakraProvider,
  useColorModeValue,
  CSSReset,
} from '@chakra-ui/react';
import Layout from '@/Components/Layout';
import { extendTheme } from '@chakra-ui/react';
import theme from '@/theme';
import Providers from '@/Providers';
import { useUserStore } from '@/stores/useUserStore';

export default function App({ Component, pageProps }: AppProps) {
  const { data, isUserLoading, userError, createUser } = useUserStore(
    (state: any) => state
  );

  return (
    <Providers>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Box>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Box>
      </ChakraProvider>
    </Providers>
  );
}
