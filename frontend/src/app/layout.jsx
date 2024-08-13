// import type { Metadata } from "next";
"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { ZetaChainTestnet } from "@particle-network/chains";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";
import { AuthContext } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
// import {
//   injectedWallet,
//   metaMaskWallet,
//   okxWallet,
//   xdefiWallet,
// } from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from 'wagmi';

// import {  createConfig } from "wagmi";
import { bscTestnet, sepolia, zetachainAthensTestnet } from "wagmi/chains";
// import { publicProvider } from "wagmi/providers/public";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });



const id = process.env.NEXT_PUBLIC_APP_PROJECT_ID;

const config = getDefaultConfig({
  appName: 'NFT Ticketing',
  projectId: id,
  chains: [sepolia, zetachainAthensTestnet, bscTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


// const connectors = connectorsForWallets(
//   [
//       {
//           groupName: "Recommended",
//           wallets: [injectedWallet],
//       },
//   ],
//   {
//       appName: "NFT Ticketing",
//       projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
//   }
// );

// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors,
//   chains: [sepolia, zetachainAthensTestnet, bscTestnet],
//   transports: {
//     [sepolia.id]: http(),
//     [zetachainAthensTestnet.id]: http(),
//     [bscTestnet.id]: http(),
//   }
//   // [sepolia.id, zetachainAthensTestnet.id, bscTestnet.id]
//   // publicClient,
//   // webSocketPublicClient,
// });

// const wagmiConfig = createConfig({
//   connectors,
//   chains: [zkSync, zkSyncSepoliaTestnet],
//   transports: {
//       [zkSyncSepoliaTestnet.id]: http(),
//       [zkSync.id]: http(),
//   },
// });

const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} header1_gradient`}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider >
              <ZetaChainTestnet>
                <ToastContainer
                position="top-center" autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick rtl={false}
                pauseOnFocusLoss draggable pauseOnHover theme="light"
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
                        supportChains: [ZetaChainTestnet],
                      },
                    },
                  }}
                >
                  <AuthContext>{children}</AuthContext>
                </AuthCoreContextProvider>
              </ZetaChainTestnet>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
