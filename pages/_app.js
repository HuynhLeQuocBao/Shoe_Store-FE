import { SessionProvider, getSession } from "next-auth/react";
import { SWRConfig } from "swr";
import { AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import { MainLayout, isTest } from "@/layout/index";
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
import { cartApi } from "@/apiClient/cartAPI";
import { useEffect } from "react";

let productsCache;
let cartsCache;

function MyApp(props) {
  const { isPageLoading } = usePageLoading();
  const { Component, pageProps, session, navigationProps } = props;
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
  useEffect(() => {
    productsCache = navigationProps?.products;
    cartsCache = navigationProps?.carts;
  }, []);
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="description"
          content="Author: Bao-Cat. This is a shoe store from VN."
        />
        <meta
          name="google-site-verification"
          content="411OybsylKe6hQWEP7kwBIJ0avMzknO63TzOF1J6ceY"
        />
        <title>Footwear from Viet Nam</title>
        <meta name="robots" content="index,follow" />
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
                    <Layout
                      carts={navigationProps?.carts}
                      products={navigationProps?.products}
                    >
                      <ToastContainer />
                      <Component
                        {...pageProps}
                        products={navigationProps?.products}
                      />
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

  if (productsCache && cartsCache) {
    return {
      ...appProps,
      session,
      navigationProps: {
        products: productsCache,
        carts: cartsCache,
      },
    };
  }

  const products = await productApi.getAllProducts();
  let carts = [];
  if (session) {
    setToken(session?.accessToken);
    carts = await cartApi.getAllCart();
  }

  const navigationProps = {
    products,
    carts,
  };
  productsCache = navigationProps.products;
  cartsCache = navigationProps.carts;
  return { ...appProps, session, navigationProps };
};

export default MyApp;
