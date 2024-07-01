'use client'
import React from 'react'
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
// import Login from "@/components/Login"
const Dashboard = () => {

  const { userInfo } = useAuthCore()
  const { connect, disconnect } = useConnect();
  return (
    <div>
      { 
        userInfo ? (
          <>
          <button onClick={disconnect}>Disconnect</button>
          <p>Dashboard</p>
          </>
        ) : <p>Login</p>
      }
    </div>
  )
}

export default Dashboard
