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
import Howticket from "@/components/Howticket"
const Dashboard = () => {

  const { userInfo } = useAuthCore()
  const { connect, disconnect } = useConnect();
  return (
    <div>
      {/* { 
        userInfo ? ( */}
          <>
          <Header />
          <Howticket />
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
