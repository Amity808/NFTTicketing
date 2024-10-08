'use client'
import React from 'react'
import Link from "next/link"
import { useAuth } from "@/context/AuthContext";
import {
  useEthereum,
  useConnect,
  useAuthCore,
} from "@particle-network/auth-core-modal";
import ConnectAuth from "@/components/ConnectAuth"
const Navbar = () => {
  const { connected, connect, disconnect } = useConnect()
  return (
    <div className=''>
      <div className="text-white flex justify-around items-center py-9">
        <div>
            <h1 className=' text-3xl font-bold'>Stay Studio</h1>
        </div>

        <div className=' max-sm:hidden'>
            <ul className=' flex gap-12 justify-between flex-row list-none text-lg font-normal'>
                <li className=''>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href={"/event"}>Event</Link>
                </li>
                <li>
                    <Link href={"/about-us"}>About Us</Link>
                </li>
                <li>
                    <Link href={"/contact"}>About Us</Link>
                </li>
            </ul>
        </div>

        <div>
            {/* <button className=' rounded-md border-2 border-solid py-2 px-3 text-lg font-normal'>Login</button> */}
            <ConnectAuth />
        </div>
      </div>
    </div>
  )
}

export default Navbar
