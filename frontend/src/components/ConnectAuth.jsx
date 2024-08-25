"use client";
import React from "react";
import {
  useConnect,
} from "@particle-network/auth-core-modal";

import { useAuth } from "@/context/AuthContext";
import { truncateAddress } from "@/utils/truncateAddress"
const ConnectAuth = () => {
  const { connected, disconnect } = useConnect();
  const { handleLogin: login, balance: balanceInfo, address, disconnect: logout, walletAddress } = useAuth()
  return (
    <div>
      {connected ? (
        <>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              View Wallet
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
              <a>
                <p>{balanceInfo}</p>
                </a>
              </li>
              <li>
              <a>
                  <p>{truncateAddress(address)}</p>
                </a>
              </li>
              <li>
              <a>
                  <button className="" onClick={() => disconnect()}>
                    Disconnect
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="dropdown dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              Connect Wallet
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
              <a>
                <button className="" onClick={() => login("twitter")}>
                    Connect with Twitter
                  </button>
                </a>
              </li>
              <li>
              <a>
                  <button className="" onClick={() => login("google")}>
                    Connect with Google
                  </button>
                </a>
              </li>
              <li>
              <a>
                  <button className="" onClick={() => login("github")}>
                    Connect with Github
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ConnectAuth;
