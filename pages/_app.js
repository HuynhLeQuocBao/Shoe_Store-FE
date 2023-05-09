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
import { Provider, useSelector } from "react-redux";
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
  setToken(session?.accessToken);
  const req = context.ctx.req;
  const value = req
    ? req.headers.cookie &&
      req.headers.cookie
        .split(";")
        .some((cookie) => cookie.trim().startsWith("persist:root="))
      ? req.headers.cookie
          .split(";")
          .filter((cookie) => cookie.trim().startsWith("persist:root="))[0]
          .split("=")[1]
      : null
    : localStorage.getItem("persist:root");
  const localStorageCart = JSON.parse(value);
  if (localStorageCart && session) {
    const cartRedux = JSON.parse(localStorageCart?.cart);
    const isCartAvailable =
      cartRedux?.products?.length > 0 && cartRedux?.quantity > 0;
    const isCartsCacheMessageAvailable = cartsCache?.message;
    if (isCartAvailable && !cartsCache) {
      //when the page loads for the first time
      cartsCache = await cartApi.getAllCart();
    } else if (isCartAvailable && isCartsCacheMessageAvailable) {
      //when there is data in redux and cache is message
      cartsCache = await cartApi.getAllCart();
    } else if (
      cartRedux.products.length === 0 &&
      cartRedux.quantity === 0 &&
      !isCartsCacheMessageAvailable
    ) {
      //when there is no data in redux and cache message is not available
      cartsCache = await cartApi.getAllCart();
    }
  }
  const isOrderCompleteOrCheckout =
    context.router.state?.route === "/order-complete" ||
    context.router.state?.route === "/checkout";
  if ((session && !cartsCache) || isOrderCompleteOrCheckout) {
    cartsCache = await cartApi.getAllCart();
  }
  if (!productsCache) {
    const products = await productApi.getAllProducts();
    const navigationProps = {
      products,
      carts: cartsCache,
    };
    productsCache = navigationProps.products;
    return { ...appProps, session, navigationProps };
  }
  if (productsCache) {
    return {
      ...appProps,
      session,
      navigationProps: {
        products: productsCache,
        carts: cartsCache,
      },
    };
  }
  const navigationProps = {
    products: productsCache,
    carts: cartsCache,
  };
  return { ...appProps, session, navigationProps };
};

export default MyApp;
