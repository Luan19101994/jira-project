import React, { useState  , createContext, useLayoutEffect } from 'react' 
import { getAllUser } from '../service/UserService'
const UserManagerContext = createContext() 
function UserManagerProvider({children}) {   
    const [showDetail , setShowDetail] = useState(false)  
    const [user , setUser] = useState({})  
    const [users , setUsers] = useState([])  
    
    useLayoutEffect(() => {
        async function fetchUsers() {
            const { content } = await getAllUser()
            setUsers(content)
        }
        fetchUsers()
    }, [setUsers])
    const value = { 
        showDetail,
        setShowDetail,
        user,
        setUser,
        users , setUsers
    }
    return (
        <UserManagerContext.Provider value={value}> 
            {children}
        </UserManagerContext.Provider> 
    )
}
export { UserManagerProvider, UserManagerContext }