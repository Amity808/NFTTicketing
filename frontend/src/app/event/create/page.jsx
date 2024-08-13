"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AAWrapProvider, SmartAccount } from "@particle-network/aa";
import { ZetaChainTestnet } from "@particle-network/chains";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import CustomInput from "@/components/ui/CustomInput";
import { ethers } from "ethers";
import NFtTicketingAbi from "@/contract/ticketnft.json"
import {useAuth} from "@/context/AuthContext"
import { customProvider } from "../../../utils/provider";
import { toast } from 'react-toastify';

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [creatorAddress, setCreatorAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [totalTicket, setTotalTIcket] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [uri, setUri] = useState("")

  const { customProvider, getTokenLengP, executeUserOp, signer } = useAuth()
  const { address, switchChain, provider } = useEthereum();

  // const signer =  customProvider.getSigner()
  
  // console.log(contract, "contract");
  
  
  
  
  
  const contract = new ethers.Contract(
    NFtTicketingAbi.address,
    NFtTicketingAbi.abi,
    signer
  )


  // const signer = provider.

  const createEvent = async () => {
    // const signer = await customProvider.getSigner()
    const contract = new ethers.Contract(
      NFtTicketingAbi.address,
      NFtTicketingAbi.abi,
      signer
    )
    try {
      const newEvent = await contract.createEvvent(
        creatorAddress,
        amount, totalTicket, eventDate, endDate, uri
  
      );
  
      await newEvent.wait()
      console.log(newEvent, "tokenid")
    } catch (error) {
      console.log(error)
    }

  }
  console.log(provider, "provider");

  const handleEvent = async (e) => {
    e.preventDefault()
    try {
      await toast.promise(createEvent(), {
        pending: "Creating Event",
        success: "Event Created",
        error: "Error in creating event contact admin",
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div className=" text-white flex justify-center items-center flex-col">
          <form action="" onSubmit={handleEvent}>
            {/* <CustomInput className={" mt-5"} placeholder={"Event Name"} onChange={(e) => setName(e.target.value)} name={"name"} /> */}
            <input type="text" placeholder={"Event Name"} onChange={(e) => setName(e.target.value)} className={`input input-bordered w-full max-w-xs`} name={"name"}  />
            <CustomInput className={" mt-5"}
              placeholder={"Creator Address"}
              onChange={(e) => setCreatorAddress(e.target.value)}
              name={"creatorAddress"}
            />
            <CustomInput className={" mt-5"} placeholder={"Amount"}
            onChange={(e) => setAmount(e.target.value)}
            name={"amount"} />
            <CustomInput className={" mt-5"}
            onChange={(e) => setTotalTIcket(e.target.value)}
            placeholder={"Total Ticket"} name={"totalTicket"} />
            <CustomInput className={" mt-5"} onChange={(e) => setEndDate(e.target.value)} placeholder={"End Date"} name={"endDate"} />
            <CustomInput className={" mt-5"} placeholder={"Event Date"} onChange={(e) => setEventDate(e.target.value)} name={"eventDate"} />
            <CustomInput className={" mt-5"} placeholder={"Token URI"} onChange={(e) => setUri(e.target.value)} name={"eventDate"} />
            <div>
              <button className=" bg-[#0c2c9e] text-white w-[300px] mt-5 h-[50px] rounded-lg  flex justify-center items-center" type="submit">
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" mt-10 flex flex-col item-center justify-center gap-10">
        {/* <button onClick={getTokenLeng} className=" text-white">Token</button> */}
        <button onClick={() => executeUserOp()} className=" text-white">Token</button>
        {/* <div className=''> */}

        {/* </div> */}
      </div>
      <div className=" mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default CreateEvent;
