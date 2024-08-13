'use client'
import React from "react";
import Navbar from "../../components/Navbar";



import AllTicket from "@/components/Collections/AllTicket"

const TicketDeatails = () => {
  
 

  return (
    <div>
      <Navbar />
      <div className=" flex flex-row">
       
        <AllTicket />
        {/* <TicketCard /> */}
      </div>
    </div>
  );
};

export default TicketDeatails;
