'use client'
import React from 'react'
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
// import Login from "@/components/Login"
import Header from "@/components/Header"
import { SignupForm } from "@/components/SocialLogin"
const Dashboard = () => {

  const { userInfo } = useAuthCore()
  const { connect, disconnect } = useConnect();
  return (
    <div>
      {/* { 
        userInfo ? ( */}
          <>
          <Header />
          <button onClick={disconnect}>Disconnect</button>
          <p>Dashboard</p>
          </>
      {/* //   ) : <>
      //   <SignupForm />
      //   </>
      // } */}
    </div>
  )
}

export default Dashboard
