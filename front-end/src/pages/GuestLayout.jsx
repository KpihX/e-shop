import { useUserContext } from "../contexts/UserProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout(){
    const {token} = useUserContext();
    if(token){
       return <Navigate to='/'/>
    }

    return(
        <div>
            <div>
            Layout
            </div>
            <Outlet />
        </div>
    )
}