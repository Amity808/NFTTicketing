"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import { useAuth } from "@/context/AuthContext";
import { ethers } from "ethers";
import NFtTicketingAbi from "@/contract/ticketnft.json";

const TicketCard = ({ id }) => {
  const { customProvider, signer, signerp, address } =
    useAuth();
  const [tickets, setTickets] = useState([]);
  const [fetchTicket, setFetchTicket] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);

  const contract = new ethers.Contract(
    NFtTicketingAbi.address,
    NFtTicketingAbi.abi,
    signerp
  );

  console.log(contract, "contract");
  //   console.log(signer, "signerTicket")

  const getFormattedTicket = useCallback(async () => {
    // if (!contract) return;

    try {
      // 2
      const ticket = await contract._tickets(id);
      const isValidTicket =
        ticket[id] !== "0x0000000000000000000000000000000000000000" &&
        ticket[4] !== "";
      console.log(ticket, "ticketx");
      // if (!ticket) return null;

      
      if (isValidTicket) {
        setFetchTicket({
          price: Number(ticket[0]),
          creator: ticket[1],
          availableTicket: Number(ticket[2]),
          sold: Number(ticket[3]),
          uri: ticket[4],
          expireDate: Number(ticket[5]),
          eventDate: Number(ticket[6]),
          startDate: Number(ticket[7]),
          ticketStatus: Number(ticket[8]),
          tokenID: Number(ticket[9]),
        });
      // ticketArray.push(ticket);
      }
    } catch (error) {
      console.error(`Error fetching ticket ${id}:`, error);
    }
  }, []);

  console.log(fetchTicket, "fet");
  useEffect(() => {
    console.log("useeffect");
    // if (!signer) {
    //     console.log('Signer is not initialized.');
    //     return;
    // }

    // const fethchTickets = async () => {
    //     const totalRegTicket = await contract.ticketLen();
    //     console.log(totalRegTicket.toString(), "reglen")
    //     const ticketArray = []

    //     for (let i = 1; i <= totalRegTicket; i++) {
    //         try {
    //             const ticket = await contract._tickets(i);
    //             const isValidTicket = ticket[1] !== '0x0000000000000000000000000000000000000000' && ticket[4] !== '';
    //                 if (isValidTicket) {
    //                     ticketArray.push(ticket);
    //                 }
    //             console.log(ticket, "ticktoPush")
    //             // ticketArray.push(ticket);
    //         } catch (error) {
    //             console.log(error, "error fetching")
    //         }
    //     }
    //     console.log(ticketArray, "array")
    //     setTickets(ticketArray)
    // }
    // fethchTickets()
    console.log("done");

    getFormattedTicket();
    if (!fetchTicket) return;
    const fetchURI = async () => {
      try {
        const response = await fetch(fetchTicket.uri);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTicketDetails(data);
        console.log("Fetched URI Data:", data);
      } catch (error) {
        console.error("Error fetching URI data:", error);
      }
    };
    fetchURI();
  }, [fetchTicket]);

  const handleMint = async () => {
    // ticketDetails,
    // address -> address
    // chainID ->  amount -> 
    const amount = fetchTicket?.price
    // uri = ticketDetails
    
    try {
      const mint = await contract._mintNFT(address, 7000, amount, ticketDetails)
      await mint.wait()
      console.log(mint, "min result")
    } catch (error) {
      console.log(error, "mint error")
    }

  }

  console.log(ticketDetails, "details");

  if (!fetchTicket) return null;
  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={`https://blue-accused-trout-688.mypinata.cloud/${ticketDetails?.image}`}
            alt="image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{ticketDetails?.name}</h2>
          <p>{ticketDetails?.description}</p>
          {/* <p>{fetchTicket?.uri}</p> */}
          <div className="card-actions justify-end">

            <button className="btn btn-primary">
              Mint
            </button>
            <button className="btn btn-primary" onClick={handleMint}>
              {fetchTicket?.price} Price
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
