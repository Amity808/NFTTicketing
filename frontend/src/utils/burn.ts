import { useFeesContext } from "@/context/FeesContext";
import TICKETABi from "@/contract/ticketnft.json"
import { ethers } from "ethers";
import { useAuth } from "@/context/AuthContext";
import { useFetchUserNFTs } from "./fetchNFTs"
import { useNFT } from "@/hooks/useNFT"



export const useBurn = () => {
    const {
        assetsUpdating,
        setAssetsUpdating,
        setAssetsBurned,
        omnichainContract,
      } = useNFT()
      const { setInbounds, inbounds  } = useFeesContext()

      const { address, signerp } = useAuth()

      const { fetchNFTs } = useFetchUserNFTs()


      const burn = async (id: any) => {
        try {
            const checkApproval = async (
                id: any, contract: any
            ): Promise<boolean | void> => {
                try {
                    const approved = await contract.getApproved(id)
                    if (approved.toLowerCase() === omnichainContract.toLowerCase()) {
                        return true
                    } else {
                        await contract.approve(omnichainContract, id)
                        for (let i = 0; i < 5; i++) {
                            await new Promise((resolve) => setTimeout(resolve, 5000))
                            const approved = await contract.getApproved(id)
                            if (approved.toLowerCase() === omnichainContract.toLowerCase()) {
                                return true
                            }
                        }
                    }
                    checkApproval(id, contract)
                } catch (error) {
                    console.error("Approval process cancelled.", error)
                    return false
                }
            }

            const checkNFTOwnership = async (nftId: any, contract: any) => {
                try {
                    await contract.ownerOf(nftId)
                    await new Promise((resolve) => setTimeout(resolve, 5000))
                    checkNFTOwnership(nftId, contract)
                } catch (error) {
                    setAssetsBurned((b: any) => (b.includes(id) ? b : [...b, id]))
                    setAssetsUpdating(assetsUpdating.filter((a: any) => a !== nftId))
                    return await fetchNFTs()
                }
        }

        setAssetsUpdating((b: any) => (b.includes(id) ? b : [...b, id]))
        const contract = new ethers.Contract(omnichainContract, TICKETABi.abi, signerp)
        if (await checkApproval(id, contract)) {
            const cctxhash = await contract.burnNFT(parseInt(id), address)
            await checkNFTOwnership(id, contract)
            const inbound = {
                inboundHash: cctxhash.hash,
                desc: `Burning an NFT`,
              }
              setInbounds([...inbounds, inbound])
      
        } else {
            setAssetsUpdating(assetsUpdating.filter((a: any) => a !== id))
            console.error("Burn cancelled.")
        }
        } catch (error) {
            console.error(error)
            setAssetsUpdating(assetsUpdating.filter((a: any) => a !== id))
        }
      }
      return { burn }
}