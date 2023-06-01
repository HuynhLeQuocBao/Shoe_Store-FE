import App from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";

import { MainLayout } from "@/layout/index";
import axiosClient from "../apiClient/axiosClient";
import { store, persistor } from "../store/store";
import { usePageLoading } from "hooks/usePageLoading";
import LoadingPageGlobal from "@/components/section/loading/LoadingPageGlobal";
import { SWRConfig } from "swr";

const HeadContent = () => (
  <Head>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Footwear </title>

    <meta
      name="description"
      content="The purpose of this website is for the graduation thesis with the task of learning NextJS on the Front-end side and ExpressJS on the Back-end side to build an e-commerce website."
    />
    <meta name="keywords" content="shoe, shoe-store, bao, cat, kltn20" />
    <meta name="author" content="Bao Huynh - Cat Le" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Footwear from KLTN 20" />
    <meta property="og:site_name" content="Footwear from KLTN 20" />
    <meta property="og:url" content="https://shoe-store-fe.vercel.app" />
    <meta
      property="og:description"
      content="The purpose of this website is for the graduation thesis with the task of learning NextJS on the Front-end side and ExpressJS on the Back-end side to build an e-commerce website."
    />
    <meta
      property="og:image"
      content="https://shoe-store-fe.vercel.app/SEO_image.png"
    />
    <meta property="og:image:alt" content="Footwear from KLTN 20" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="567" />

    <link rel="icon" type="image/x-icon" href="favicon.png" />
  </Head>
);

function MyApp(props) {
  const { isPageLoading } = usePageLoading();
  const { Component, pageProps } = props;
  const Layout = Component.Layout ?? MainLayout;

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );

  return (
    <>
      <HeadContent />
      <SessionProvider session={pageProps.session}>
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false,
          }}
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {isPageLoading ? (
                <LoadingPageGlobal loading={isPageLoading} />
              ) : (
                <InstantSearch searchClient={searchClient} indexName="product">
                  <Layout>
                    <ToastContainer />
                    <Component {...pageProps} />
                    <Analytics />
                  </Layout>
                </InstantSearch>
              )}
            </PersistGate>
          </Provider>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  return {
    ...appProps,
  };
};

export default MyApp;
