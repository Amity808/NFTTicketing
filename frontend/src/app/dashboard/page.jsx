'use client'
import React from 'react'


import Header from "@/components/Header"

import Howticket from "@/components/Howticket"
import Footer from '@/components/Footer'


const Dashboard = () => {
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