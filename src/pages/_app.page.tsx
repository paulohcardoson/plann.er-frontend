import ErrorPage from "@base/components/ErrorPage";
import ApiError from "@base/shared/api/errors/ApiError";
import "@base/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Source_Code_Pro } from "next/font/google";
import Head from "next/head";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  if (pageProps.error) {
    return <ErrorPage {...{ ...pageProps.error }} />;
  }

  return (
    <main className={inter.className}>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Component {...pageProps} />
    </main>
  );
}
