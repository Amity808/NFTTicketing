// cm03zwpyzl45701zd4z313iaw
import NFTABI from "@/contract/ticketnft.json"

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
  

export const useFetchUserNFTs = () => {
    const {
        setAssetsReloading,
        setAssets,
        omnichainContract,
        fetchForeignCoins,
      } = useNFT()

      const { address } = useAuth()

      const fetchNFTs = async () => {
        setAssetsReloading(true)
        try {
            let ownedNFTs: any = []
            const rpc = getEndpoints("evm", "zeta_testnet")[0]?.url

            if(address) {
                const transfers = (await request(
                    GOLDSKY_API, query(address.toLocaleLowerCase())
                )) as any
                 ownedNFTs = findNFTsUser(address, transfers?.transfers)
            }
            const provider = new ethers.providers.StaticJsonRpcProvider(rpc)

            const c = new ethers.Contract(omnichainContract, NFTABI.abi, provider)
            const foreignCoins = await fetchForeignCoins() 
            let assests = await Promise.all(
                ownedNFTs.map(async (id: any) => {
                    const chain = (await c.tokenChains(BigInt(id))).toString()
                    const decimals = foreignCoins.find(
                      (b: any) =>
                        b.coin_type === "Gas" &&
                        parseInt(b.foreign_chain_id) === parseInt(chain)
                    )?.decimals
                    const amount = formatUnits(
                      await c.tokenAmounts(BigInt(id)),
                      parseInt(decimals)
                    )
                    return { id, amount, chain, decimals }
                  })
            )
            assests = assests.filter((nft: any) => parseInt(nft.chain) > 0)
            assests.sort((a: any, b: any) => parseInt(b.id) - parseInt(a.id))
      setAssets(assests)
        } catch (error) {
            console.error(error)
    } finally {
      setAssetsReloading(false)
    }
      }
      return { fetchNFTs }
}