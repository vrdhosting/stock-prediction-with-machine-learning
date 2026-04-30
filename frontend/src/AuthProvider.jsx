import React from 'react';
import { useState,createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    
    const [isLoggedIn,setIsLoggedIn] = useState(() => {
        const tokens = localStorage.getItem('accessToken');
        return tokens ? true : false;
    });

    
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export { AuthContext };  