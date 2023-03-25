import { SessionProvider, getSession } from "next-auth/react";
import { SWRConfig } from "swr";
import { AnimatePresence } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import { MainLayout } from "@/layout/index";
import axiosClient from "../apiClient/axiosClient";
import Head from "next/head";
import App from "next/app";

function MyApp(props) {
  const { Component, pageProps, session } = props;
  const Layout = Component.Layout ?? MainLayout;

  const handleExitComplete = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0 });
    }
  };

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
      </Head>

      <SWRConfig
        value={{
          fetcher: (url) => axiosClient.get(url),
          shouldRetryOnError: false,
        }}
      >
        <SessionProvider session={session}>
          <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AnimatePresence>
        </SessionProvider>
      </SWRConfig>
    </>
  );
}

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);
  const session = await getSession(context);

  return { ...appProps, session };
};

export default MyApp;
