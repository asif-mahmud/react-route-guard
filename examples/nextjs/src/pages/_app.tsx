import { Layout } from "@/components/Layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // render everything under layout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
