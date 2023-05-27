import { SessionProvider, getSession } from "next-auth/react";
import { SWRConfig } from "swr";
import { AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import { MainLayout } from "@/layout/index";
import axiosClient, { setToken } from "../apiClient/axiosClient";
import Head from "next/head";
import App from "next/app";
import { store, persistor } from "../store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePageLoading } from "hooks/usePageLoading";
import LoadingPageGlobal from "@/components/section/loading/LoadingPageGlobal";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";
import { productApi } from "@/apiClient/product";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";

let productsCache;
function MyApp(props) {
  const { isPageLoading } = usePageLoading();
  const { Component, pageProps, session, navigationProps, router } = props;
  const Layout = Component.Layout ?? MainLayout;
  const handleExitComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  };
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );
  useEffect(() => {}, [router.pathname]);
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
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

      <SessionProvider session={session}>
        <SWRConfig
          value={{
            fetcher: (url) => axiosClient.get(url),
            shouldRetryOnError: false,
          }}
        >
          <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                {isPageLoading ? (
                  <LoadingPageGlobal loading={isPageLoading} />
                ) : (
                  <InstantSearch
                    searchClient={searchClient}
                    indexName="product"
                  >
                    <Layout products={navigationProps?.products}>
                      <ToastContainer />
                      <Component
                        {...pageProps}
                        products={navigationProps?.products}
                      />
                      <Analytics />
                    </Layout>
                  </InstantSearch>
                )}
              </PersistGate>
            </Provider>
          </AnimatePresence>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  const session = await getSession(context);

  if (!productsCache) {
    const products = await productApi.getAllProducts();
    const navigationProps = {
      products,
    };
    productsCache = products;
    return { ...appProps, session, navigationProps };
  }
  return {
    ...appProps,
    session,
    navigationProps: {
      products: productsCache,
    },
  };
};

export default MyApp;
