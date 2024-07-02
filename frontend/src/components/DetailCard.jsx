import React from 'react'
import Image from 'next/image'

const DetailCard = () => {
  return (
    <div>
        <div className=' flex flex-row justify-center gap-16 items-center'>
            <div>
                <Image src={"/detail.png"} width={400} height={400} alt={`name`} />
            </div>
            <div className=' text-white w-[400px] h-[400px]'>
                <h3 className=' text-white  font-bold text-2lg'>#1119 Seagull</h3>
                <p>The Birdhouse is a collection of 6000 birds, each with it's own unique traits & personality. See them all at TheBirdHouse.app</p>
            </div>
        </div>
    </div>
  )
}

export default DetailCard