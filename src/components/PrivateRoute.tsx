import { useEffect, useState } from "react";
import { handleIsLoggedIn } from "../handlers/classHandler";
import { Navigate } from "react-router-dom";



interface PrivateRouteProps {
  children: JSX.Element
}


export default function PrivateRoute({children} : PrivateRouteProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
    {isLoggedIn ? 
    <>{children}</> :
    <Navigate to='/login' />}
    </>
  )  
}