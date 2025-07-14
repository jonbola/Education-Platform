import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { Account } from "@/models/account";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AccountContextProps = {
    accountList: Account[];
    isLoading: boolean;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export default function AccountProvider({ children }: { children: React.ReactNode }) {
    const [accountList, setAccountList] = useState<Account[]>([]);
    const [isLoading, setLoadingState] = useState<boolean>(false);

    async function fetchData() {
        try {
            setLoadingState(true);
            const accountAsyncStorage = await AsyncStorage.getItem("accounts");
            const formattedAccountList: Account[] = accountAsyncStorage ? JSON.parse(accountAsyncStorage) : [];
            setAccountList(formattedAccountList);
            setLoadingState(false);
        }
        catch {
            console.log("Cannot fetch Account records from AsyncStorage");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AccountContext.Provider value={{ accountList, isLoading }}>
            {children}
        </AccountContext.Provider>
    );
}

export function useAccountContext() {
    const context = useContext(AccountContext);

    if (!context) {
        throw new Error("Method useAccountContext must be in AccountProvider");
    }

    return context;
}