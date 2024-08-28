import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { ZetaChainClient } from "@zetachain/toolkit/client"
import { useAuth } from "@/context/AuthContext"
import { AAWrapProvider, SmartAccount, SendTransactionMode  } from "@particle-network/aa";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import { ethers } from "ethers";
import { ZetaChainTestnet, ZetaChain } from "@particle-network/chains";
const ZetaChainContext = createContext<any>(undefined!)

interface ZetaChainProviderProps {
  children: ReactNode
}

export function ZetaChainProvider({ children }: ZetaChainProviderProps) {

  // const { customProvider } = useAuth()
  

 
  // const signer = customProvider?.getSigner()



  // const createClient = useCallback((signer: any) => {
  //   return new ZetaChainClient({
  //     signer: signer,
  //     network: "testnet",
  //     chains: {
  //       zeta_testnet: {
  //         api: [
  //           {
  //             url: `https://zetachain-athens.g.allthatnode.com/archive/evm/${process.env.NEXT_PUBLIC_ATN_KEY}`,
  //             type: "evm",
  //           },
  //         ],
  //       },
  //     },
  //   })
  // }, [])

  // const [client, setClient] = useState(() => createClient(signer))

  // useEffect(() => {

    
  //   if (signer) {
  //     setClient(createClient(signer))
  //   }
  // }, [customProvider?.getSigner(), createClient])

  return (
    <>
    </>
    // <ZetaChainContext.Provider value={{ client }}>
    //   {children}
    // </ZetaChainContext.Provider>
  )
}

export function useZetaChainClient(): any {
  const context = useContext(ZetaChainContext)
  if (context === undefined) {
    throw new Error("useZetaChain must be used within a ZetaChainProvider")
  }
  return context
}