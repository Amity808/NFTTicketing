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
import Footer from '@/components/Footer'

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
          <Footer />
        
          </>
      {/* //   ) : <>
      //   <SignupForm />
      //   </>
      // } */}
    </div>
  )
}

export default Dashboard
