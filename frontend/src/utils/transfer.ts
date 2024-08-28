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
            
        }
    }
}