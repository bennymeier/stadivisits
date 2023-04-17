import { ChakraProvider, Box } from '@chakra-ui/react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

function Stadivists({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <Head>
          <title>Stadivists</title>
        </Head>
        <Navbar />
        <Box padding={4}>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default Stadivists;
