import Image from "next/image";
import { SignupForm } from "@/components/SocialLogin"
import Navbar from "../components/Navbar"
import Header from "@/components/Header"
import Howticket from "@/components/Howticket"
import Footer from '@/components/Footer'
export default function Home() {
  return (
    <div>
    {/* { 
      userInfo ? ( */}
        <>
        <Header />
        <Howticket />
        <Footer />
      
        </>
  </div>
  );
}
