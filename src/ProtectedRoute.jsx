import { AuthContext } from "./context/authContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
    const userContext = useContext(AuthContext);
    const loading = userContext?.loading;
    const isAuthenticated = userContext?.isAuthenticated;

    if(!loading && !isAuthenticated){
        return <Navigate to={'/login'} replace/>
    }
    return (
        <Outlet/>
    )
}

export default ProtectedRoute