import { Children, createContext, useState } from "react";    

const UserContext = createContext({
    accessToken: "",
    setAccessToken: () => {}
});

export const UserProvider = ({children}) => {
    const [accessToken, setAccessToken] = useState({
        accessToken
    });

    return (
        <UserContext.Provider value={{accessToken}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;