import ErrorPage from "@base/components/ErrorPage";
import ApiError from "@base/shared/api/errors/ApiError";
import "@base/styles/globals.css";
import type { AppProps } from "next/app";
import { Fira_Code, Inter, Source_Code_Pro } from "next/font/google";
import Head from "next/head";

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

      <Component {...pageProps} />
    </main>
  );
}
