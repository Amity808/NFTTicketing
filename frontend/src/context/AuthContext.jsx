"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
// import { ParticleProvider } from '@particle-network/provider';
import { ZetaChainTestnet, ZetaChain } from "@particle-network/chains";
import { AAWrapProvider, SmartAccount, SendTransactionMode  } from "@particle-network/aa";
import { ethers } from "ethers";
import NFtTicketingAbi from "@/contract/ticketnft.json";
import { ParticleNetwork } from "@particle-network/auth";

const SocialoginAccount = createContext();

export const AuthContext = ({ children }) => {
  const chain = ZetaChainTestnet.id
  console.log(chain)
  const { provider } = useEthereum();
  const smartAccount = new SmartAccount(provider, {
    projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
    clientKey: process.env.NEXT_PUBLIC_APP_CLIENT_KEY,
    appId: process.env.NEXT_PUBLIC_APP_APP_ID,
    // aaOptions: {
    // }
    aaOptions: {
      accountContracts: {
        SIMPLE: [{ version: "1.0.0", chainIds: [chain] }],
      },
    },
  });
 
  console.log(smartAccount);
  const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount, SendTransactionMode.Gasless), "any");

  // let customProvider;
  // if (typeof window !== "undefined") {
  //   customProvider = new ethers.BrowserProvider(
  //     new AAWrapProvider(smartAccount),
  //     "any"
  //   );
  // }
  
  const [balance, setBalance] = useState(null);
  const [address, setaddress] = useState(null);
  const [signer, setSigner] = useState(null);
  const [particleAddress, setparticleAddress] = useState("");
 
  const { connect, disconnect, connected } = useConnect();
  const { userInfo } = useAuthCore();
 
  
  const signerp = customProvider?.getSigner();

  const contract = new ethers.Contract(
    NFtTicketingAbi.address,
    NFtTicketingAbi.abi,
    signer
  );
  console.log("signerp", signerp);

  const getTokenLengP = async () => {
    const signer = await customProvider.getSigner();
    
    try {
      if (!signer) {
        console.error("Signer is undefined");
        return;
      }
      
      const tokenid = await contract._nextTokenId();
      // await tokenid;
      console.log(tokenid, "tokenid");
    } catch (error) {
      console.error("Error in getTokenLengP:", error);
    }
  };
  // const [provider, setProvider] = useState(second)
  //   const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userInfo) {
      fetchBalance();
    }
    
  }, [userInfo, smartAccount, customProvider]);
  // console.log(signer, "signer")

  console.log(userInfo);
  console.log(balance);

  const fetchBalance = async () => {
    const addressParticle = await smartAccount.provider.selectedAddress;
    console.log(addressParticle);
    setaddress(addressParticle);
    const balanceResponseParticle = await customProvider.getBalance(
      addressParticle
    );
    setBalance(ethers.utils.formatEther(balanceResponseParticle));
    const signers = customProvider.getSigner();
    console.log(signers);
    setSigner(signers);
  };

  console.log(signer, "signer");

  const handleLogin = async (authType) => {
    if (!userInfo) {
      try {
        await connect({
          socialType: authType,
          chain: ZetaChainTestnet,
          prompt: "select_account",
        });
      } catch (error) {
        console.log(error, "lognError");
      }
    }
  };

  const executeUserOp = async () => {
    try {
       if (!signer) {
        console.error("Signer is not available");
        return;
      }
      // const signer = customProvider.getSigner();
      const tx = {
        to: "0x9dBa18e9b96b905919cC828C399d313EfD55D800",
        value: ethers.utils.parseEther("0.001"),
      };
      const txResponse = await signer.sendTransaction(tx);
      const txReceipt = await txResponse.wait();
      console.log("Transaction receipt:", txReceipt);
    } catch (error) {
      console.error("Error in executeUserOp:", error);
    }
  };

  return (
    <SocialoginAccount.Provider
      value={{
        handleLogin,
        userInfo,
        balance,
        connect,
        disconnect,
        address,
        customProvider,
        getTokenLengP,
        executeUserOp,
        signer,
        contract,
        signerp
      }}
    >
      {children}
    </SocialoginAccount.Provider>
  );
};

export default SocialoginAccount;

export const useAuth = () => {
  return useContext(SocialoginAccount);
};
