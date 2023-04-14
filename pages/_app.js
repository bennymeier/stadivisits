import { ChakraProvider } from '@chakra-ui/react';
import '../css/style.css';
import '../css/form.css';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';

function Stadivists({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider>
        <Head>
          <title>Stadivists</title>
        </Head>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default Stadivists;
