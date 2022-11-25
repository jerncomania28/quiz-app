import { createContext, useReducer, useState } from "react";


const initialState = {
    isLoggedIn: false,
    handleIsLoggedIn: (_ac: boolean) => null
}


export const AuthContext = createContext<any>(initialState);

const AuthProvider = ({ children }: { children: any }) => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const handleIsLoggedIn = (_ac: boolean) => {
        setIsLoggedIn(_ac)
    }

    const value = {
        isLoggedIn,
        handleIsLoggedIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )


}

export default AuthProvider;

