import { useAuth } from "@/context/AuthContext";
import {
    useEthereum,
    useConnect,
    useAuthCore,
  } from "@particle-network/auth-core-modal";
import { useRouter} from "next/navigation"
import {SignupForm} from "@/components/SocialLogin"
import Preloader from "../components/Preloader";

const AuthWrapper = ({ children }) => {
    const router = useRouter();

    const {} = useAuth();

    const { userInfo } =useAuthCore()

    if(userInfo) {
        return <>{children}</>
    }

    if(!userInfo) {
        return <SignupForm />
    }
    return <Preloader />;
}