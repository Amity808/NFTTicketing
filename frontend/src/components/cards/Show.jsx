import React from 'react'
import Image from "next/image"
const Show = () => {
  return (
    <div className=' bg-[#272d37] text-white flex items-center justify-center'>
      <div>
        <Image src={"/iconticket.png"} width={30} height={30} />
      </div>
      <div>
        <p>Connect your social account</p>
        <p>Once find your desired ticket and mint for your event or contact admin to sell ticket</p>
      </div>
    </div>
  )
}

export default Show
fce