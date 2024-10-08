"use client"
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import debounce from "lodash/debounce"
import { useAccount } from "wagmi"
// import { useZetaChainClient } from "@/hooks/useZetaChainClient"
import { useAuth } from "./AuthContext"
type Props = {}

const BalanceContext = createContext<any>(null)

export const BalanceProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    // const { client } = useZetaChainClient()
    const { client } = useAuth()
    const { address, isConnected } = useAccount()
    const [balances, setBalances] = useState<any>([])
    const [balancesLoading, setBalancesLoading] = useState(true)
    const [balancesRefreshing, setBalancesRefreshing] = useState(false)
    const [bitcoinAddress, setBitcoinAddress] = useState("")

    const fetchBalances = useCallback(
        debounce(async (refresh: Boolean = false, btc: any = null) => {
            if (refresh) setBalancesRefreshing(true)
            if (balances.length === 0) setBalancesLoading(true)
            try {
                if (!isConnected) {
                    return setBalances([])
                }
                console.log("Fetching Balances..");
                const b = await client.getBalances({
                    evmAddress: address,
                    btcAddress: address
                })
                setBalances(b)

            } catch (error) {
                console.log(error)
            } finally {
                setBalancesRefreshing(false)
                setBalancesLoading(false)
            }
        }, 500
        ), [isConnected, address]
    )

    const connectBitCoin = async () => {
        const w = window as any 
        if ("xfi" in w && w.xfi?.bitcoin) {
            w.xfi.bitcoin.changeNetwork("testnet")
            const btc = (await w.xfi.bitcoin.getAccounts())[0]
            await setBitcoinAddress(btc)
            fetchBalances(true, btc)
          }
    }

    useEffect(() => {
        fetchBalances(true)
      }, [isConnected, address])
    return (
        <BalanceContext.Provider
      value={{
        balances,
        bitcoinAddress,
        balancesLoading,
        balancesRefreshing,
        connectBitCoin,
        setBitcoinAddress,
        setBalances,
        fetchBalances,
      }}
    >
      {children}
    </BalanceContext.Provider>
    )
}

export const useBalanceContext = () => useContext(BalanceContext)