import WalletConnectProvider from "@/client/providers/WalletConnectProvider";
import "@/client/styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <main>
      <QueryClientProvider client={queryClient}>
        <WalletConnectProvider>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </WalletConnectProvider>
      </QueryClientProvider>
    </main>
  );
}
