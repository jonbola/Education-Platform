import React, { useContext } from "react";
import { createContext, useState } from "react";

type UserContextProps = {
    isLogged: boolean;
    setLoggedState: (value: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const [isLogged, setLoggedState] = useState(false);

    return (
        <UserContext.Provider value={{ isLogged, setLoggedState }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("Method useUserContext must be in UserProvider");
    }

    return context;
}