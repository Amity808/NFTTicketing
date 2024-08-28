'use client'
import React, { useState, useEffect, useCallback } from 'react'
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
import { Input } from "@/components/ui/zeta/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/zeta/select"
import { useFetchUserNFTs } from "@/utils/fetchNFTs";
type Props = {}

const Mint = (props: Props) => {
    const { signerp, address } =
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



    const formatAmount = (amount: any) => {
        const a = Number(amount);
        let formated = a.toString();
        return a % 1 === 0 ? parseInt(formated) : parseFloat(formated);
    }


    return (
        <div>

        </div>
    )
}

export default Mint