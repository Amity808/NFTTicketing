'use client'
import React, {useState, useEffect, useCallback} from 'react'
import NFtTicketingAbi from "@/contract/ticketnft.json"
import {useAuth} from "@/context/AuthContext"
import { ethers } from "ethers"
import TicketCard from "@/components/cards/TicketCard"
const AllTicket = () => {

  const { signerp } = useAuth()

  const contract = new ethers.Contract(
    NFtTicketingAbi.address,
    NFtTicketingAbi.abi,
    signerp
  )
    
  const [ticketList, setTicketList] = useState([]);

    const getTicketList = async () => {
      const totalRegTicket = await contract.ticketLen();
      // console.log(totalRegTicket.toString(), "reglen")
      
      try {
        
        const ticketArray = []
      for ( let i = 0; i < totalRegTicket; i++) {
        ticketArray.push(
          <TicketCard key={i} id={i}  />
        )
      }
      // return ticketArray
      setTicketList(ticketArray);
      } catch (error) {

    }
  }

  useEffect(() => {
    getTicketList();
  }, []);
  return (
    <div>
       <div className=' mx-auto max-w-4xl py-5 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8'>
            {ticketList}
          </div>
      </div>
    </div>
  )
}

export default AllTicket
