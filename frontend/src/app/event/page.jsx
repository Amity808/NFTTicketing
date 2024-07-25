'use client'
import React from "react";
import TicketCard from "../../components/cards/TicketCard";
import Navbar from "../../components/Navbar";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import { toast } from 'react-toastify';
import {useAuth} from "@/context/AuthContext"
import AllTicket from "@/components/Collections/AllTicket"

const TicketDeatails = () => {
  
  const { customProvider, getTokenLengP, executeUserOp, signer } = useAuth()

  return (
    <div>
      <Navbar />
      <div className=" flex flex-row">
        {/* <TicketCard id={2} /> */}
        <AllTicket />
        {/* <TicketCard /> */}
      </div>
    </div>
  );
};

export default TicketDeatails;
