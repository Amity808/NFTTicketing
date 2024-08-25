// cm03zwpyzl45701zd4z313iaw

import { getEndpoints } from "@zetachain/networks"
import { ethers } from "ethers"
import { gql, request } from "graphql-request"
import { formatUnits } from "viem"
import { useAccount } from "wagmi"
import { useNFT } from "@/hooks/useNFT"
import { useAuth } from "@/context/AuthContext";
const GOLDSKY_API = "https://api.goldsky.com/api/public/project_clzopnkec66vn01v3h63hebnd/subgraphs/ticketing-zetachain-testnet/v1/gn"


const query = (address: string) => {
    return gql`
        query {
          transfers(
            first: 100
            where: {
              or: [
                { to: "${address}" }
                { from: "${address}" }
              ]
            }
          ) {
            id
            to
            from
            block_number
            tokenId
          }
        }
      `
  }


  const findNFTsUser = (walletAddress: string, transfers: any) => {
    let currentOwnership: any = {}
    transfers.sort(
      (a: any, b: any) => parseInt(a.block_number) - parseInt(b.block_number)
    )
  
    transfers.forEach((transfer: any) => {
      if (transfer.to.toLowerCase() === walletAddress.toLowerCase()) {
        currentOwnership[transfer.tokenId] = true
      } else if (transfer.from.toLowerCase() === walletAddress.toLowerCase()) {
        currentOwnership[transfer.tokenId] = false
      }
    })
  
    return Object.keys(currentOwnership).filter((id) => currentOwnership[id])
  }
  