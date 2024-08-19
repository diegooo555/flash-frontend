import { useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { registerRequest, loginUser, verifyTokenRequest } from "../api/user";
import Cookies from 'js-cookie';
import { AuthContext } from "./authContext";
import PropTypes from 'prop-types';


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({
        id: "",
        email: "",
    })
    const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [loading, setLoading] = useState(true)

    const signup = async (user)=> {

        try {
            const res = await registerRequest(user)
            setUser(res);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
        }
    }

    const signin = async (user) => {
        try {
            const res = await loginUser(user)
            console.log(res);
            if(res.status === 200){
                setUser(res.data);
                setIsAuthenticated(true);
                console.log(user);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return <Navigate to={'/login'} replace/>;
            }
            
            try {
                const res = await verifyTokenRequest();
                if (!res) {
                    setIsAuthenticated(false);
                    return <Navigate to={'/login'} replace/>;
                };        
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
                console.log(error);
                return <Navigate to={'/login'} replace/>;
            }
        };
        checkLogin();
    }, [loading]);

    const logOut = () => {
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser({
            id: "Indefinido",
            email: "Indefinido",
        })
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading, signup, signin, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}