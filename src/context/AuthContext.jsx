'use client'
import React, { createContext, useContext, useState, useEffect} from 'react'
import { useRouter } from "next/navigation";
import {
    useEthereum,
    useConnect,
    useAuthCore
  } from "@particle-network/auth-core-modal";
  import { ZetaChainTestnet } from "@particle-network/chains";
  import { AAWrapProvider, SmartAccount } from "@particle-network/aa";
  import { ParticleProvider } from "@particle-network/provider";
  import { ParticleNetwork } from "@particle-network/auth";
  import  {ethers}  from "ethers"

const SocialoginAccount = createContext()

export const AuthContext = ({children}) => {

    const { provider } = useEthereum();
    const smartAccount = new SmartAccount(provider, {
        projectId:  process.env.NEXT_PUBLIC_APP_PROJECT_ID,
        clientKey:  process.env.NEXT_PUBLIC_APP_CLIENT_KEY,
        appId: process.env.NEXT_PUBLIC_APP_APP_ID,
      // aaOptions: {
        // }
        aaOptions: {
          accountContracts: {
              simple: [{ chainId: [ZetaChainTestnet.id], version: '1.0.0'}]
          
        }
    }
    });
    console.log(smartAccount);
    const customProvider = new ethers.BrowserProvider(new AAWrapProvider(smartAccount), "any");
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();



  const [balance, setBalance] = useState(null)
  const [address, setaddress] = useState(null)
//   const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    if (userInfo) {
        fetchBalance()
        walletAddress();
    }
  }, [userInfo, smartAccount, customProvider])

  console.log(userInfo);
  console.log(balance);
  const walletAddress = async () => {
    const addressEvM = userInfo?.wallets
        .filter((item) => item.chain_name === "evm_chain")
        .map((item) => item.public_address);

    console.log(addressEvM[0], "evm");
    setaddress(addressEvM[0])
    return addressEvM[0];
}

//   userInfo?.wallets.map((item) => {
//     item.chain_name == "evm" ? setaddress(item.public_address) : "no evm address"
// })

  const fetchBalance = async () => {
    const balanceResponse = await customProvider.getBalance(address);
    console.log(balanceResponse, "balance");
    setBalance(ethers.formatEther(balanceResponse))
  }

  const handleLogin = async (authType) => {
    if(!userInfo) {
       try {
        await connect({
          socialType: authType,
          chain: ZetaChainTestnet,
          prompt: "select_account",
          
      })
       } catch (error) {
        console.log(error, "lognError");
       }
    }
  };

  const executeUserOp = async () => {
    const signer = customProvider.getSigner();
    const tx = {
      to: "0x000000000000000000000000000000000000dEaD",
      value: ethers.parseEther("0.001"),
    };
    const txResponse = await signer.sendTransaction(tx);
    const txReceipt = await txResponse.wait();
  };



  return (
    <SocialoginAccount.Provider value={{ handleLogin, userInfo, balance, connect, disconnect, address, walletAddress}}>
        {children}
    </SocialoginAccount.Provider>
  )
}

export default SocialoginAccount

export const useAuth = () => {
    return useContext(SocialoginAccount)
}