import { useBalanceContext } from "@/context/BalanceContext"
import { useCCTXsContext } from "@/context/CCTXsContext";
import { networks } from "@zetachain/networks"
import { getAddress } from "@zetachain/protocol-contracts"
import { prepareData } from "@zetachain/toolkit/client"
import { parseEther } from "viem"
import { useAuth } from "@/context/AuthContext"
import { useNFT } from "@/hooks/useNFT";

export const useMint = () => {
    const { amount, setAmount, setMintingInProgress, omnichainContract } =
    useNFT()
    const { setInbounds, inbounds } = useCCTXsContext()
    const { bitcoinAddress } = useBalanceContext()
    const { connectBitcoin } = useBalanceContext()

    const { address, customProvider, getTokenLengP, executeUserOp, signer, signerp } = useAuth()


    const mint = async (chain: any) => {
        try{
            setMintingInProgress(true);
            let chainName = Object.entries(networks).find(([key, value]) => {
                return value.chain_id === parseInt(chain)
            })?.[0]

            let cctxHash: any
            if (parseInt(chain) === 18332) {
                await connectBitcoin()
                (window as any).xfi.bitcoin.request(
                    {
                        method: "transfer",
                        params: [
                          {
                            feeRate: 10,
                            from: bitcoinAddress,
                            recipient: getAddress("tss", "btc_testnet"),
                            amount: {
                              amount: parseFloat(amount) * 1e8,
                              decimals: 8,
                            },
                            memo: `${address}`.replace(/^0x/, ""),
                          },
                        ],
                      },
                      (error: any, hash: any) => {
                        if (!error) {
                          cctxHash = hash
                        }
                      }
                )
            } else {
                const value = parseEther(amount)
                const to = getAddress("tss", chainName as any)
                const data = prepareData(omnichainContract, ["address"], [address])
                const cctx = await signerp?.sendTransaction({ data,to, value})
                cctxHash = cctx.hash
            }

            setAmount("")
            if(cctxHash) {
                const inbound = {
                    inboundHash: cctxHash,
                    desc: `Minting an NFT`
                }
                setInbounds([...inbounds, inbound])
            }
        } catch(err){
console.log(err)
        } finally {
            setMintingInProgress(false)
        }
    }
    return { mint }


}
