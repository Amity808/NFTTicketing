import React from 'react'
import Navbar from './Navbar'
import Image from 'next/image'
const Header = () => {
  return (
    <div className=''>
        <Navbar />
        <div className=' px-2 flex flex-row justify-around items-center max-sm:flex-col'>
            <div>
                <h3 className=' text-white text-8xl font-extrabold lg:text-7xl lg:font-extrabold max-lg:text-6xl max-lg:font-bold sm:font-semibold sm:text-3xl max-sm:font-semibold max-sm:text-3xl'>Discover a New Era <br /> of Crypto Currency</h3>
                <p className=' text-white font-normal text-base'>Panda NFT is the primier marketplace for NFT, which are digital items you can <br /> truly own. Digital items have existed for a long time, but never like <br /> this.</p>
            </div>
            <div>
                <Image src="/header.png" width={400} height={536} />
            </div>
        </div>
        <div>
            <h3 className=' text-center text-2xl font-bold text-white'>ZetaChain</h3>
        </div>
    </div>
  )
}

export default Header