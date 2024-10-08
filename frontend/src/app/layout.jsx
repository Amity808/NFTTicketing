"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ZetaChainTestnet, EthereumSepolia } from "@particle-network/chains";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";
import { AuthContext } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import Index from "./index"
import { bscTestnet, sepolia, zetachainAthensTestnet } from "wagmi/chains";
import { ZetaChainProvider } from "@/hooks/useZetaChainClient"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

const config = getDefaultConfig({
  appName: "NFT Ticketing",
  projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
  chains: [sepolia, zetachainAthensTestnet, bscTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} header1_gradient`}>
        <ZetaChainProvider>

        
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <AuthCoreContextProvider
                options={{
                  projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
                  clientKey: process.env.NEXT_PUBLIC_APP_CLIENT_KEY,
                  appId: process.env.NEXT_PUBLIC_APP_APP_ID,
                  erc4337: {
                    name: "SIMPLE",
                    version: "1.0.0",
                  },
                  wallet: {
                    visible: true,
                    customStyle: {
                      supportChains: [ZetaChainTestnet, EthereumSepolia],
                    },
                  },
                }}
              >
                <AuthContext>
                  <Index>
                  {children}
                  </Index>
                </AuthContext>
              </AuthCoreContextProvider>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        </ZetaChainProvider>
      </body>
    </html>
  );
}
