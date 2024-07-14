'use client'
import React, {useState, useEffect, useCallback} from 'react'
import {
    useEthereum,
    useConnect,
    useAuthCore,
  } from "@particle-network/auth-core-modal";
  import {useAuth} from "@/context/AuthContext"
  import { ethers } from "ethers";
import NFtTicketingAbi from "@/contract/ticketnft.json"

const TicketCard = (id) => {
    const { customProvider, getTokenLengP, executeUserOp, signer } = useAuth()
    const [tickets, setTickets] = useState([])
    const [fetchTicket, setFetchTicket] = useState(null)
    const [ticketDetails, setTicketDetails] = useState(null);


    const contract = new ethers.Contract(
        NFtTicketingAbi.address,
        NFtTicketingAbi.abi,
        signer
      )

      console.log(contract, "contract")
    //   console.log(signer, "signerTicket")
    
    // const getFormatedTicket = useCallback(async ()  => {
    //         const ticket = await contract._tickets(id);
    //         if(!ticket) return null;
    //         setFetchTicket({
    //                 price: Number(ticket[0]),
    //                 creator: ticket[1],
    //                 availableTicket: Number(ticket[2]),
    //                 sold: Number(ticket[3]),
    //                 uri: ticket[4],
    //                 expireDate: Number(ticket[5]),
    //                 eventDate: Number(ticket[6]),
    //                 startDate: Number(ticket[7]),
    //                 ticketStatus: Number(ticket[8]),
    //                 tokenID: Number(ticket[9]),
    //             })
    //         }, [ticket])
            const getFormattedTicket = useCallback(async () => {
                if (!contract) return;
                
                try {
            const ticket = await contract._tickets(1);
            console.log(ticket, "ticket")
            if (!ticket) return null;
            
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
        } catch (error) {
            console.error(`Error fetching ticket ${id}:`, error);
        }
    }, [contract]);
    console.log(fetchTicket, "fet")
    useEffect(() => {
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

      if (!fetchTicket) return;
      const fetchURI = async () => {
          try {
              const response = await fetch(fetchTicket.uri);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setTicketDetails(data);
              console.log('Fetched URI Data:', data);
          } catch (error) {
              console.error('Error fetching URI data:', error);
          }
      };
      fetchURI();
      getFormattedTicket()
  }, [fetchTicket, getFormattedTicket])

    
  return (
    <div>
        <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
      alt="Album" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">New album is released!</h2>
    <p>Click the button to listen on Spotiwhy app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Listen</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default TicketCard