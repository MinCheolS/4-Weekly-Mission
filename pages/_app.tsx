import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pagesWithOutHeaderFooter = ['/signin', '/signup'];

  const renderPageHeaderFooter = pagesWithOutHeaderFooter.includes(
    router.pathname
  );

  return (
    <>
      <Head>
        <title>Linkbrary</title>
      </Head>
      {!renderPageHeaderFooter && <Header />}
      <Component {...pageProps} />
      {!renderPageHeaderFooter && <Footer />}
    </>
  );
}
