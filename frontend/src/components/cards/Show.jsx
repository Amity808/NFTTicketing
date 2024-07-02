import React from 'react'
import Image from "next/image"
const Show = () => {
  return (
    <div className=' flex justify-center items-center'>
          <div className='flex gap-10 flex-wrap w-full justify-center items-center' >
      <div className=' bg-[#272d37] text-white flex flex-col items-center justify-center w-[380px] h-[320px] rounded-lg text-center'>
      <div>
        <Image src={"/iconticket.png"} width={50} className="mb-5" height={50} />
      </div>
      <div>
        <p className=" text-lg font-normal">Connect your social account</p>
        <p>Once find your desired ticket and mint for your event or contact admin to sell ticket</p>
      </div>
    </div>
    <div className=' bg-[#272d37] text-white flex flex-col items-center justify-center w-[380px] h-[320px] rounded-lg text-center'>
      <div>
        <Image src={"/iconticket.png"} width={50} className="mb-5" height={50} />
      </div>
      <div>
        <p className=" text-lg font-normal">Once Sign with your social account</p>
        <p>Search for your desire purchase ticket</p>
      </div>
    </div>
    <div className=' bg-[#272d37] text-white flex flex-col items-center justify-center w-[380px] h-[320px] rounded-lg text-center'>
      <div>
        <Image src={"/iconticket.png"} width={50} className="mb-5" height={50} />
      </div>
      <div>
        <p className=" text-lg font-normal">When you found your ticket</p>
        <p>Mint the ticket to your address for your events accessiblity</p>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Show