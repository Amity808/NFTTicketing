'use client'

import React, { useState, useEffect } from "react";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import { ZetaChainTestnet } from "@particle-network/chains";
import { AAWrapProvider, SmartAccount } from "@particle-network/aa";
import { ParticleProvider } from "@particle-network/provider";
import { ParticleNetwork } from "@particle-network/auth";
import  {ethers}  from "ethers";
import { useAuth } from "@/context/AuthContext";


const Login = () => {

  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();



  const [balance, setBalance] = useState(null)
//   const [userInfo, setUserInfo] = useState(null);

    const { handleLogin: login, balance: balanceInfo, address, disconnect: logout, walletAddress } = useAuth()
 

  console.log(userInfo);




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

  // const addressEvm = walletAddress()
  return <div>
    <div className="App">
      {!userInfo ? (
        <div>
          <button onClick={() => handleLogin('google')}>Sign in with Google</button>
          <button onClick={() => login('twitter')}>Sign in with Twitter</button>
          <button onClick={() => login('github')}>Sign in with github</button>
        </div>
      ) : (
        <div>
          <h2>{userInfo.name}</h2>
          <div>
            <small>{balanceInfo}</small>
            {/* <small>{addressEvm}</small> */}
            <p>{address}</p>
            <button onClick={executeUserOp}>Execute User Operation</button>
            <button onClick={logout}>Disconnect</button>
          </div>
        </div>
      )}
    </div>
  </div>;
};

export default Login;
