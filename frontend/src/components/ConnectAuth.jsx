'use client'
import React from "react";
import {
    useEthereum,
    useConnect,
    useAuthCore,
  } from "@particle-network/auth-core-modal";
  import {SignupForm} from "@/components/SocialLogin"
const ConnectAuth = () => {
    const { connected, connect, disconnect } = useConnect()
  return (
    <div>
        {connected ? <>
      <div className="dropdown dropdown-left">
        <div tabIndex={0} role="button" className="btn m-1">
          {connected ? <><button className=' rounded-md border-2 border-solid py-2 px-3 text-lg font-normal'></button></> : <><button className=' rounded-md border-2 border-solid py-2 px-3 text-lg font-normal'>Login</button></>}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </div>
        
        </> : <><SignupForm /></>}
    </div>
  );
};

export default ConnectAuth;
