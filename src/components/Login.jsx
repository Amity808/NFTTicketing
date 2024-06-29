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
// import { ParticlePro}

// const config = {
//   projectId: process.env.NEXT_PUBLIC_TEMPLATE_APP_PROJECT_ID | "35784d4b-b53b-43ae-8ec2-03ac789775be",
//   clientKey: process.env.NEXT_PUBLIC_TEMPLATE_APP_CLIENT_KEY | "cN302UbBvBJ6aSaVD6CoDbuPEo2DZqVEayOewk9u",
//   appId: process.env.NEXT_PUBLIC_TEMPLATE_APP_APP_ID | "sKa6rk6whXguxGeRP3er2oLocreNPGRy6z4RC3Mg",
// }

// const particle = new ParticleNetwork({
//   ...config,
//   chainName: ZetaChainTestnet.name,
//   chainId: ZetaChainTestnet.id,
//   wallet: { displayWalletEntry: true }
// });

// const smartAccount = new SmartAccount(new ParticleProvider(particle.auth), {
//   ...config,
//   aaOptions: {
//       simple: [{ chainId: ZetaChainTestnet.id, version: '1.0.0' }]
//     }
// });

// particle.setERC4337({
//     name: 'SIMPLE',
//     version: '1.0.0'
// });

const Login = () => {
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
    const customProvider = new ethers.BrowserProvider(new AAWrapProvider(smartAccount), "any");
  const { connect, disconnect } = useConnect();
  const { userInfo } = useAuthCore();



  const [balance, setBalance] = useState(null)
//   const [userInfo, setUserInfo] = useState(null);


  useEffect(() => {
    if (userInfo) {
        fetchBalance()
    }
  }, [userInfo, smartAccount, customProvider])

  console.log(userInfo);
  console.log(balance);

  const fetchBalance = async () => {
    const address = await smartAccount.getAddress()
    const balanceResponse = await customProvider.getBalance(address);
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
  return <div>
    <div className="App">
      {!userInfo ? (
        <div>
          <button onClick={() => handleLogin('google')}>Sign in with Google</button>
          <button onClick={() => handleLogin('twitter')}>Sign in with Twitter</button>
          <button onClick={() => handleLogin('github')}>Sign in with github</button>
        </div>
      ) : (
        <div>
          <h2>{userInfo.name}</h2>
          <div>
            <small>{balance}</small>
            <button onClick={executeUserOp}>Execute User Operation</button>
            <button onClick={disconnect}>Disconnect</button>
          </div>
        </div>
      )}
    </div>
  </div>;
};

export default Login;
