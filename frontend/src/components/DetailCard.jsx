import React from 'react'
import Image from 'next/image'
import { useMint } from '@/utils/mint'
import { useNFT } from '@/hooks/useNFT';


const DetailCard = () => {
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
  const { mint } = useMint()
  return (
    <div>
        <div className=' flex flex-row justify-center gap-16 items-center'>
            <div>
                <Image src={"/detail.png"} width={400} height={400} alt={`name`} />
            </div>
            <div className=' text-white w-[400px] h-[400px]'>
                <h3 className=' text-white  font-bold text-3xl'>#1119 Seagull</h3>
                <p className=' text-base font-normal pt-5'>The Birdhouse is a collection of 6000 birds, each with it&rsquo;s own unique traits & personality. See them all at TheBirdHouse.app</p>
            <div className=' text-white font-normal text-base  flex flex-row justify-between pt-14'>
              <div>
                <p>Location</p>
                <p className=' font-semibold text-lg'>Location</p>
              </div>
              <div>
                <p>Price</p>
                <p className=' font-semibold text-lg'>0.000001 eth</p>
              </div>
            </div>
            <div className=' flex justify-center items-center pt-10'>
              <button className=' bg-[#1e50ff] text-white w-[200px] h-[50px] rounded-lg'>Mint Ticket</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default DetailCard