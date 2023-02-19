import Head from 'next/head';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { Global, css } from '@emotion/react';
import { AuthProvider } from '@/lib/auth';
import { Inter } from '@next/font/google';
import customTheme from '@/styles/theme';

const inter = Inter({
  subsets: ['latin'],
});

const GlobalStyle = ({ children }) => {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <CSSReset />
      <Global
        styles={css`
          html {
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <main className={inter.className}>
          <GlobalStyle />
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </ChakraProvider>
  );
}
