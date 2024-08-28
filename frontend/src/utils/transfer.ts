import TICKETABi from "@/contract/ticketnft.json"
import { ethers } from "ethers"
import { useAuth } from "@/context/AuthContext"
import { useFetchUserNFTs } from "./fetchNFTs"
import { useNFT } from "@/hooks/useNFT"


export const useTransfer =  () => {
    const { setAssetsUpdating, assetsUpdating, recipient, omnichainContract } =
    useNFT()

    const { signerp, address } =
    useAuth();

    const { fetchNFTs } = useFetchUserNFTs()

    const transfer = async (id: any) => {
        const checkNFTOwnership = async (nftId: any, contract: any) => {
            const owner = await contract.ownerof(nftId)
            await new Promise((resolve) => setTimeout(resolve, 5000))
            if (owner === address) {
                checkNFTOwnership(nftId, contract)
            } else {
                await fetchNFTs()
                setAssetsUpdating(assetsUpdating.filter((a: any) => a !== id))
            }
        }

        try {
            setAssetsUpdating((b: any) => (b.includes(id) ? b : [...b, id]))
            const contract = new ethers.Contract(omnichainContract, TICKETABi.abi, signerp)
            await contract.transferfrom(address,  recipient, id)
            await checkNFTOwnership(id, contract)
        } catch (error) {
            setAssetsUpdating(assetsUpdating.filter((a: any) => a !== id))
        }
    }
    return { transfer }
}