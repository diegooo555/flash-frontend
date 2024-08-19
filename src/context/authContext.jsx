import { createContext } from "react";

/*For postgress interface AuthUser {
    id: number,
    email: string,
} */




/* fro postgress interface UserContextType {
    user: AuthUser ,
    setUser: React.Dispatch<React.SetStateAction<{
        id: number;
        email: string;
    }>>,
    isAuthenticated: boolean,
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    signup: (user: FieldValues) => Promise<void>,
    signin: (user: FieldValues) => Promise<void>,
    logOut: () => void,
} */


export const AuthContext = createContext(null);