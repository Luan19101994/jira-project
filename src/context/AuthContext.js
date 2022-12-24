import React, { useState  , createContext, useEffect } from 'react' ;

const AuthContext = createContext();

function AuthProvider({children}) {   
    const isLogin = localStorage.getItem('curentUser');
    const [curentUser , setCurentUser] = useState(JSON.parse(isLogin) ? JSON.parse(isLogin) : undefined);

    
    useEffect(() => {
        if(curentUser) {
            localStorage.setItem('curentUser', JSON.stringify(curentUser));
        }
    }, [curentUser])

    const value = { 
        curentUser, 
        setCurentUser
    }
    return (
        <AuthContext.Provider value={value}> 
            {children}
        </AuthContext.Provider> 
    )
}
export { AuthProvider, AuthContext };