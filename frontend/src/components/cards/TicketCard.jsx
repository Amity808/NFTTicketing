"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import { useCCTXsContext } from "@/context/CCTXsContext";
import { useAuth } from "@/context/AuthContext";
import { ethers } from "ethers";
import NFtTicketingAbi from "@/contract/ticketnft.json";
import { useNFT } from "@/hooks/useNFT";
import { useMint } from "@/utils/mint";
import { useAccount } from "wagmi"
import { debounce } from "lodash"
import { Button } from "@/components/ui/zeta/button";
import  { Input } from "@/components/ui/zeta/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/zeta/select"
import { useFetchUserNFTs } from "@/utils/fetchNFTs";
const TicketCard = ({ id }) => {
  const {  signerp, address } =
    useAuth();
    const { cctxs } = useCCTXsContext()
    const { mint } = useMint()
    const { fetchNFTs } = useFetchUserNFTs()
    const {
      assets,
      selectedChain,
      setSelectedChain,
      amount,
      setAmount,
      assetsReloading,
      assetsUpdating,
      assetsBurned,
      mintingInProgress,
      recipient,
      setRecipient,
      foreignCoins,
    } = useNFT()
    

    const { switchChain } = useEthereum()
    const { chain } = useAccount()
    const [tickets, setTickets] = useState([]);
    const [fetchTicket, setFetchTicket] = useState(null);
    const [ticketDetails, setTicketDetails] = useState(null);
    
    const handleSwitchNetwork = async () => {
      if (chain?.id) {
        switchChain?.(selectedChain)
      }
    }

    const debuncedFetchNFTs = debounce(fetchNFTs, 1000)

    const wrongNetwork = !selectedChain || parseInt(selectedChain) === 18332 || parseInt(selectedChain) === chain?.id
  const contract = new ethers.Contract(
    NFtTicketingAbi.address,
    NFtTicketingAbi.abi,
    signerp
  );



  const formatAmount = (amountF) => {
    const a = Number(amountF);
    let formated = a.toString();
    return a % 1 === 0 ? parseInt(formated) : parseFloat(formated);
  }

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
