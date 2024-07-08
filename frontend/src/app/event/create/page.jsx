'use client'
import React, { useState, useEffect} from 'react'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import CustomInput from "@/components/ui/CustomInput"
const CreateEvent = () => {
  const [name, setName] = useState('')
  const [creatorAddress, setCreatorAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [totalTicket, setTotalTIcket] = useState('')
  const [endDate, setEndDate] = useState('')
  const [eventDate, setEventDate] = useState('')

  const { address, switchChain, provider } = useEthereum();
  console.log(provider, "provider")
  return (
    <div>
        <div>
            <Navbar />
        </div>
      <div className=' mt-10'>
        <div className=''>
          <form action="" className='flex flex-col item-center justify-center gap-10'>
            <div className=''>
          <CustomInput placeholder={"Event Name"} name={"name"} />
            </div>
            <div>
          <CustomInput placeholder={"Creator Address"} name={"creatorAddress"} />
            </div>
            <div>
          <CustomInput placeholder={"Amount"} name={"amount"} />
            </div>
            <div>
          <CustomInput placeholder={"Total Ticket"} name={"totalTicket"} />
            </div>
            <div>
          <CustomInput placeholder={"End Date"} name={"endDate"} />
            </div>
            <div>
          <CustomInput placeholder={"Event Date"} name={"eventDate"} />
            </div>
            <div>
              <button className=' bg-[#1e50ff] text-white w-[200px] h-[50px] rounded-lg '>Create Event</button>
            </div>
          </form>
        </div>
      </div>
      <div className=" mt-10">
      <Footer />
      </div>
    </div>
  )
}

export default CreateEvent
